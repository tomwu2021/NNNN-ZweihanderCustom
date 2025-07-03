/*=============================================================================
 NNNN_ZweihanderCustom.js
----------------------------------------------------------------------------
 Custom Two-Handed Weapon Plugin / 自定義雙手武器插件 / カスタム両手武器プラグイン
 This plugin allows weapons with <isZweihander:true> note tag to automatically
 unequip shields, and provides a character trait to ignore this restriction.
 このプラグインは<isZweihander:true>ノートタグ付きの武器が自動的に盾を外し、
 この制限を無視するキャラクター特性を提供します。
 此插件允許帶有<isZweihander:true>標籤的武器自動卸下盾牌，
 並提供角色特性以忽略此限制。
----------------------------------------------------------------------------
 Version
 1.0.0 2024/12/19 Initial version / 初版 / 初版
 Author: NeNeNeNeTai
 GitHub: https://github.com/tomwu2021/NeNeNeNeTaiPlugin
=============================================================================*/

/*:
 * @plugindesc 自定義雙手武器插件 v1.0.0 / Custom Two-Handed Weapon Plugin v1.0.0 / カスタム両手武器プラグイン v1.0.0
 * @target MZ
 * @author NeNeNeNeTai
 * @url https://github.com/tomwu2021/NeNeNeNeTaiPlugin
 *
 * @help NNNN_ZweihanderCustom.js
 *
 * 自定義雙手武器系統 / Custom Two-Handed Weapon System / カスタム両手武器システム：
 * 
 * 武器note標籤 / Weapon note tags / 武器ノートタグ：
 * <isZweihander:true> - 標記為雙手武器 / Mark as two-handed weapon / 両手武器としてマーク
 * 
 * 角色note標籤 / Actor note tags / アクターノートタグ：
 * <ignoreZweihander:true> - 角色可以忽略雙手武器限制 / Actor can ignore two-handed weapon restrictions / アクターは両手武器制限を無視可能
 * <ignoreZweihander:false> - 角色強制不能忽略雙手武器限制 / Actor cannot ignore two-handed weapon restrictions / アクターは両手武器制限を無視不可
 * 
 * 職業note標籤 / Class note tags / 職業ノートタグ：
 * <ignoreZweihander:true> - 該職業可以忽略雙手武器限制 / This class can ignore two-handed weapon restrictions / この職業は両手武器制限を無視可能
 * 
 * 優先級 / Priority / 優先度：角色設定 > 職業設定 / Actor settings > Class settings / アクター設定 > 職業設定
 * 
 * 功能說明 / Features / 機能説明：
 * 1. 裝備帶有<isZweihander:true>標籤的武器時，自動卸下盾牌
 *    When equipping weapons with <isZweihander:true> tag, automatically unequip shields
 *    <isZweihander:true>タグ付きの武器を装備時、自動的に盾を外す
 * 2. 裝備盾牌時，如果當前武器是雙手武器，自動卸下武器
 *    When equipping shields, if current weapon is two-handed, automatically unequip weapon
 *    盾を装備時、現在の武器が両手武器なら自動的に武器を外す
 * 3. 擁有忽略標籤的角色或職業可以正常裝備雙手武器和盾牌
 *    Characters or classes with ignore tags can normally equip two-handed weapons and shields
 *    無視タグを持つキャラクターや職業は両手武器と盾を正常に装備可能
 * 4. 角色設定優先於職業設定
 *    Actor settings take priority over class settings
 *    アクター設定は職業設定より優先
 * 5. 雙武器模式下的智能裝備處理
 *    Intelligent equipment handling in dual wield mode
 *    二刀流モードでのインテリジェント装備処理
 * 
 * 利用規約 / License / 利用規約：
 * MIT License
 * Copyright (c) 2024 NeNeNeNeTai
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    const ignoreTagName = 'ignoreZweihander';

    // 檢查武器是否為雙手武器 / Check if weapon is two-handed / 武器が両手武器かチェック
    DataManager.isZweihanderWeapon = function(item) {
        if (!this.isWeapon(item)) return false;
        const noteData = item.note;
        return noteData.includes('<isZweihander:true>');
    };

    // 檢查角色是否可以忽略雙手武器限制 / Check if actor can ignore two-handed restrictions / アクターが両手武器制限を無視できるかチェック
    Game_Actor.prototype.canIgnoreZweihander = function() {
        const actorNoteData = this.actor().note;
        const classNoteData = this.currentClass().note;
        
        // 角色優先：如果角色明確設置了false，則不能忽略
        // Actor priority: If actor explicitly set false, cannot ignore
        // アクター優先：アクターが明示的にfalseを設定した場合、無視不可
        if (actorNoteData.includes(`<${ignoreTagName}:false>`)) {
            return false;
        }
        
        // 角色優先：如果角色設置了true，則可以忽略
        // Actor priority: If actor set true, can ignore
        // アクター優先：アクターがtrueを設定した場合、無視可能
        if (actorNoteData.includes(`<${ignoreTagName}:true>`)) {
            return true;
        }
        
        // 如果角色沒有設置，則檢查職業
        // If actor has no setting, check class
        // アクターに設定がない場合、職業をチェック
        if (classNoteData.includes(`<${ignoreTagName}:true>`)) {
            return true;
        }
        
        // 默認不能忽略 / Default cannot ignore / デフォルトは無視不可
        return false;
    };

    // 檢查角色當前是否裝備了雙手武器 / Check if actor currently has two-handed weapon equipped / アクターが現在両手武器を装備しているかチェック
    Game_Actor.prototype.hasZweihanderEquipped = function() {
        const weapons = this.weapons();
        return weapons.some(weapon => DataManager.isZweihanderWeapon(weapon));
    };

    // 檢查角色當前是否裝備了盾牌（槽位1） / Check if actor has shield equipped (slot 1) / アクターが盾を装備しているかチェック（スロット1）
    Game_Actor.prototype.hasShieldEquipped = function() {
        const shieldItem = this._equips[1]; // 槽位1是盾牌 / Slot 1 is shield / スロット1は盾
        return shieldItem && shieldItem._itemId > 0;
    };

    // 重寫裝備變更方法 / Override equipment change method / 装備変更メソッドをオーバーライド
    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        // 如果角色可以忽略雙手武器限制，則不進行限制
        // If actor can ignore two-handed restrictions, no restrictions apply
        // アクターが両手武器制限を無視できる場合、制限を適用しない
        if (this.canIgnoreZweihander()) {
            _Game_Actor_changeEquip.apply(this, arguments);
            return;
        }
        
        // 如果裝備的是武器且為雙手武器（槽位0是武器）
        // If equipping weapon and it's two-handed (slot 0 is weapon)
        // 武器を装備し、それが両手武器の場合（スロット0は武器）
        if (slotId === 0 && DataManager.isZweihanderWeapon(item)) {
            // 先裝備武器 / First equip weapon / まず武器を装備
            _Game_Actor_changeEquip.apply(this, arguments);
            // 然後卸下盾牌（槽位1） / Then unequip shield (slot 1) / 次に盾を外す（スロット1）
            if (this._equips[1] && this._equips[1]._itemId > 0) {
                this.tradeItemWithParty(null, this._equips[1].object());
                this._equips[1].setObject(null);
            }
            return;
        }
        
        // 如果裝備的是雙手武器且在槽位1（雙武器模式下的第二武器槽）
        // If equipping two-handed weapon in slot 1 (second weapon slot in dual wield mode)
        // 両手武器をスロット1に装備する場合（二刀流モードの第二武器スロット）
        if (slotId === 1 && this.isDualWield() && DataManager.isZweihanderWeapon(item)) {
            // 卸除槽位0的武器 / Remove weapon from slot 0 / スロット0の武器を外す
            if (this._equips[0] && this._equips[0]._itemId > 0) {
                this.tradeItemWithParty(null, this._equips[0].object());
                this._equips[0].setObject(null);
            }
            // 將雙手武器裝備到槽位0 / Equip two-handed weapon to slot 0 / 両手武器をスロット0に装備
            this.changeEquip(0, item);
            return;
        }
        
        // 如果裝備的是單手武器且在槽位1（雙武器模式下的第二武器槽）
        // If equipping single-handed weapon in slot 1 (second weapon slot in dual wield mode)
        // 片手武器をスロット1に装備する場合（二刀流モードの第二武器スロット）
        if (slotId === 1 && this.isDualWield() && DataManager.isWeapon(item) && !DataManager.isZweihanderWeapon(item)) {
            const slot0Weapon = this._equips[0].object();
            
            // 若槽位0為雙手武器，則卸除槽位0，將單手武器移至槽位0
            // If slot 0 has two-handed weapon, remove it and move single-handed weapon to slot 0
            // スロット0が両手武器の場合、それを外して片手武器をスロット0に移動
            if (slot0Weapon && DataManager.isZweihanderWeapon(slot0Weapon)) {
                this.tradeItemWithParty(null, slot0Weapon);
                this._equips[0].setObject(null);
                this.changeEquip(0, item);
                return;
            }
            
            // 若槽位0為空，則將單手武器裝備到槽位0
            // If slot 0 is empty, equip single-handed weapon to slot 0
            // スロット0が空の場合、片手武器をスロット0に装備
            if (!slot0Weapon) {
                this.changeEquip(0, item);
                return;
            }
            
            // 若槽位0不為雙手武器且不為空，則正常裝備到槽位1
            // If slot 0 is not two-handed and not empty, normally equip to slot 1
            // スロット0が両手武器でなく空でもない場合、スロット1に通常装備
            _Game_Actor_changeEquip.apply(this, arguments);
            return;
        }
        
        // 如果裝備的是盾牌（槽位1是盾牌）
        // If equipping shield (slot 1 is shield)
        // 盾を装備する場合（スロット1は盾）
        if (slotId === 1 && item && !this.isDualWield()) {
            // 檢查當前是否裝備了雙手武器
            // Check if currently equipped with two-handed weapon
            // 現在両手武器を装備しているかチェック
            if (this.hasZweihanderEquipped()) {
                // 卸下武器槽位0的雙手武器
                // Unequip two-handed weapon from slot 0
                // スロット0の両手武器を外す
                const weapon = this._equips[0].object();
                if (DataManager.isZweihanderWeapon(weapon)) {
                    this.tradeItemWithParty(null, weapon);
                    this._equips[0].setObject(null);
                }
            }
            // 然後裝備盾牌 / Then equip shield / 次に盾を装備
            _Game_Actor_changeEquip.apply(this, arguments);
            return;
        }

        // 其他情況正常裝備 / Other cases equip normally / その他の場合は通常装備
        _Game_Actor_changeEquip.apply(this, arguments);
    };

    // 重寫強制裝備變更方法 / Override force equipment change method / 強制装備変更メソッドをオーバーライド
    const _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        // 如果角色可以忽略雙手武器限制，則不進行限制
        // If actor can ignore two-handed restrictions, no restrictions apply
        // アクターが両手武器制限を無視できる場合、制限を適用しない
        if (this.canIgnoreZweihander()) {
            _Game_Actor_forceChangeEquip.apply(this, arguments);
            return;
        }

        // 如果裝備的是武器且為雙手武器（槽位0是武器）
        // If equipping weapon and it's two-handed (slot 0 is weapon)
        // 武器を装備し、それが両手武器の場合（スロット0は武器）
        if (slotId === 0 && DataManager.isZweihanderWeapon(item)) {
            // 先裝備武器 / First equip weapon / まず武器を装備
            _Game_Actor_forceChangeEquip.apply(this, arguments);
            // 然後卸下盾牌（槽位1） / Then unequip shield (slot 1) / 次に盾を外す（スロット1）
            if (this._equips[1] && this._equips[1]._itemId > 0) {
                this._equips[1].setObject(null);
            }
            return;
        }
        
        // 如果裝備的是雙手武器且在槽位1（雙武器模式下的第二武器槽）
        // If equipping two-handed weapon in slot 1 (second weapon slot in dual wield mode)
        // 両手武器をスロット1に装備する場合（二刀流モードの第二武器スロット）
        if (slotId === 1 && this.isDualWield() && DataManager.isZweihanderWeapon(item)) {
            // 卸除槽位0的武器 / Remove weapon from slot 0 / スロット0の武器を外す
            if (this._equips[0] && this._equips[0]._itemId > 0) {
                this._equips[0].setObject(null);
            }
            // 將雙手武器裝備到槽位0 / Equip two-handed weapon to slot 0 / 両手武器をスロット0に装備
            this.forceChangeEquip(0, item);
            return;
        }
        
        // 如果裝備的是單手武器且在槽位1（雙武器模式下的第二武器槽）
        // If equipping single-handed weapon in slot 1 (second weapon slot in dual wield mode)
        // 片手武器をスロット1に装備する場合（二刀流モードの第二武器スロット）
        if (slotId === 1 && this.isDualWield() && DataManager.isWeapon(item) && !DataManager.isZweihanderWeapon(item)) {
            const slot0Weapon = this._equips[0].object();
            
            // 若槽位0為雙手武器，則卸除槽位0，將單手武器移至槽位0
            // If slot 0 has two-handed weapon, remove it and move single-handed weapon to slot 0
            // スロット0が両手武器の場合、それを外して片手武器をスロット0に移動
            if (slot0Weapon && DataManager.isZweihanderWeapon(slot0Weapon)) {
                this._equips[0].setObject(null);
                this.forceChangeEquip(0, item);
                return;
            }
            
            // 若槽位0為空，則將單手武器裝備到槽位0
            // If slot 0 is empty, equip single-handed weapon to slot 0
            // スロット0が空の場合、片手武器をスロット0に装備
            if (!slot0Weapon) {
                this.forceChangeEquip(0, item);
                return;
            }
            
            // 若槽位0不為雙手武器且不為空，則正常裝備到槽位1
            // If slot 0 is not two-handed and not empty, normally equip to slot 1
            // スロット0が両手武器でなく空でもない場合、スロット1に通常装備
            _Game_Actor_forceChangeEquip.apply(this, arguments);
            return;
        }
        
        // 如果裝備的是盾牌（槽位1是盾牌）
        // If equipping shield (slot 1 is shield)
        // 盾を装備する場合（スロット1は盾）
        if (slotId === 1 && item && !this.isDualWield()) {
            // 檢查當前是否裝備了雙手武器
            // Check if currently equipped with two-handed weapon
            // 現在両手武器を装備しているかチェック
            if (this.hasZweihanderEquipped()) {
                // 卸下武器槽位0的雙手武器
                // Unequip two-handed weapon from slot 0
                // スロット0の両手武器を外す
                const weapon = this._equips[0].object();
                if (DataManager.isZweihanderWeapon(weapon)) {
                    this._equips[0].setObject(null);
                }
            }
            // 然後裝備盾牌 / Then equip shield / 次に盾を装備
            _Game_Actor_forceChangeEquip.apply(this, arguments);
            return;
        }

        // 其他情況正常裝備 / Other cases equip normally / その他の場合は通常装備
        _Game_Actor_forceChangeEquip.apply(this, arguments);
    };

})(); 