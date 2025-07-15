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
 1.1.0 2024/12/19 Added dual grip skill system and equipment ignore tags / 新增雙手持技能系統及裝備忽略標籤 / 両手持ちスキルシステムと装備無視タグを追加
 Author: NeNeNeNeTai
 GitHub: https://github.com/tomwu2021/NeNeNeNeTaiPlugin
=============================================================================*/

/*:
 * @plugindesc 自定義雙手武器插件 v1.1.0 / Custom Two-Handed Weapon Plugin v1.1.0 / カスタム両手武器プラグイン v1.1.0
 * @target MZ
 * @author NeNeNeNeTai
 * @url https://github.com/tomwu2021/NeNeNeNeTaiPlugin
 * 
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
 * <enableDualGrip:true> - 角色擁有雙手持技能，可獲得單手武器加成 / Actor has dual grip skill for single-handed weapon bonus / アクターは両手持ちスキルを持ち、片手武器ボーナスを得る
 * 
 * 職業note標籤 / Class note tags / 職業ノートタグ：
 * <ignoreZweihander:true> - 該職業可以忽略雙手武器限制 / This class can ignore two-handed weapon restrictions / この職業は両手武器制限を無視可能
 * <enableDualGrip:true> - 該職業擁有雙手持技能，可獲得單手武器加成 / This class has dual grip skill for single-handed weapon bonus / この職業は両手持ちスキルを持ち、片手武器ボーナスを得る
 * 
 * 裝備note標籤 / Equipment note tags / 装備ノートタグ：
 * <ignoreZweihander:true> - 裝備此物品可忽略雙手武器限制 / Equipping this item allows ignoring two-handed weapon restrictions / このアイテムを装備すると両手武器制限を無視可能
 * <ignoreZweihander:false> - 裝備此物品禁止忽略雙手武器限制 / Equipping this item prohibits ignoring two-handed weapon restrictions / このアイテムを装備すると両手武器制限の無視を禁止
 * 
 * 優先級 / Priority / 優先度：
 * 1. 裝備標籤（任一裝備設為false則禁止，無false且有true則允許）
 *    Equipment tags (any equipment set to false prohibits, no false and has true allows)
 *    装備タグ（いずれかの装備がfalseに設定されている場合は禁止、falseがなくtrueがある場合は許可）
 * 2. 角色設定 > 職業設定 / Actor settings > Class settings / アクター設定 > 職業設定
 * 
 * 功能說明 / Features / 機能説明：
 * 1. 裝備帶有<isZweihander:true>標籤的武器時，自動卸下盾牌
 *    When equipping weapons with <isZweihander:true> tag, automatically unequip shields
 *    <isZweihander:true>タグ付きの武器を装備時、自動的に盾を外す
 * 2. 裝備盾牌時，如果當前武器是雙手武器，自動卸下武器
 *    When equipping shields, if current weapon is two-handed, automatically unequip weapon
 *    盾を装備時、現在の武器が両手武器なら自動的に武器を外す
 * 3. 擁有忽略標籤的角色、職業或裝備可以正常裝備雙手武器和盾牌
 *    Characters, classes, or equipment with ignore tags can normally equip two-handed weapons and shields
 *    無視タグを持つキャラクター、職業、装備は両手武器と盾を正常に装備可能
 * 4. 裝備標籤優先於角色設定，角色設定優先於職業設定
 *    Equipment tags take priority over actor settings, actor settings take priority over class settings
 *    装備タグはアクター設定より優先、アクター設定は職業設定より優先
 * 5. 雙武器模式下的智能裝備處理
 *    Intelligent equipment handling in dual wield mode
 *    二刀流モードでのインテリジェント装備処理
 * 6. 雙手持技能系統：當裝備單手武器且副手為空時，擁有雙手持技能的角色可獲得額外加成
 *    Dual grip skill system: When equipping single-handed weapon with empty off-hand, characters with dual grip skill gain extra bonuses
 *    両手持ちスキルシステム：片手武器を装備し副手が空の時、両手持ちスキルを持つキャラクターは追加ボーナスを得る
 * 
 * 雙手持技能加成內容 / Dual Grip Skill Bonuses / 両手持ちスキルボーナス内容：
 * - 可透過插件參數設定各項參數的加成倍率
 * - 支援所有基本參數、追加參數、特殊參數
 * - 預設值：攻擊力 x1.2、敏捷 x1.1、暴擊率 +10%、命中率 +15%、防禦效果率 +20%
 * - Can configure bonus multipliers for each parameter through plugin settings
 * - Supports all basic parameters, extra parameters, and special parameters
 * - Default values: Attack x1.2, Agility x1.1, Critical rate +10%, Hit rate +15%, Guard effect rate +20%
* - プラグインパラメータで各パラメータのボーナス倍率を設定可能
* - 全ての基本パラメータ、追加パラメータ、特殊パラメータをサポート
* - デフォルト値：攻撃力 x1.2、敏捷性 x1.1、会心率 +10%、命中率 +15%、防御効果率 +20%
 * 
 * @param dualGripBonuses
 * @text 雙手持技能加成設定 / Dual Grip Skill Bonuses / 両手持ちスキルボーナス設定
 * @desc 設定雙手持技能的各項參數加成 / Configure parameter bonuses for dual grip skill / 両手持ちスキルの各種パラメータボーナスを設定
 * @type struct<DualGripBonus>[]
 * @default ["{\"param\":\"ATK\",\"value\":\"1.2\"}","{\"param\":\"AGI\",\"value\":\"1.1\"}","{\"param\":\"CRI\",\"value\":\"0.1\"}","{\"param\":\"HIT\",\"value\":\"0.15\"}","{\"param\":\"GRD\",\"value\":\"0.2\"}"]
 *
*/

/*~struct~DualGripBonus:
 * @param param
 * @text 參數 / Parameter / パラメータ
 * @desc 選擇要加成的參數類型 / Select the parameter type to bonus / ボーナス対象のパラメータタイプを選択
 * @type select
 * @option 最大生命值 / Max Hit Points / 最大HP
 * @value MHP
 * @option 最大魔力值 / Max Magic Points / 最大MP
 * @value MMP
 * @option 攻擊力 / Attack Power / 攻撃力
 * @value ATK
 * @option 防禦力 / Defense Power / 防御力
 * @value DEF
 * @option 魔法攻擊力 / Magic Attack Power / 魔法攻撃力
 * @value MAT
 * @option 魔法防禦力 / Magic Defense Power / 魔法防御力
 * @value MDF
 * @option 敏捷 / Agility / 敏捷性
 * @value AGI
 * @option 幸運 / Luck / 運
 * @value LUK
 * @option 命中率 / Hit Rate / 命中率
 * @value HIT
 * @option 迴避率 / Evasion Rate / 回避率
 * @value EVA
 * @option 暴擊率 / Critical Rate / 会心率
 * @value CRI
 * @option 暴擊迴避率 / Critical Evasion Rate / 会心回避率
 * @value CEV
 * @option 魔法迴避率 / Magic Evasion Rate / 魔法回避率
 * @value MEV
 * @option 魔法反射率 / Magic Reflection Rate / 魔法反射率
 * @value MRF
 * @option 反擊率 / Counter Rate / 反撃率
 * @value CNT
 * @option 生命回復率 / HP Regeneration Rate / HP再生率
 * @value HRG
 * @option 魔力回復率 / MP Regeneration Rate / MP再生率
 * @value MRG
 * @option 戰術點回復率 / TP Regeneration Rate / TP再生率
 * @value TRG
 * @option 目標率 / Target Rate / 狙われ率
 * @value TGR
 * @option 防禦效果率 / Guard Effect Rate / 防御効果率
 * @value GRD
 * @option 回復效果率 / Recovery Effect Rate / 回復効果率
 * @value REC
 * @option 藥理學 / Pharmacology / 薬の知識
 * @value PHA
 * @option 魔力消耗率 / MP Cost Rate / MP消費率
 * @value MCR
 * @option 戰術點充能率 / TP Charge Rate / TPチャージ率
 * @value TCR
 * @option 物理傷害率 / Physical Damage Rate / 物理ダメージ率
 * @value PDR
 * @option 魔法傷害率 / Magic Damage Rate / 魔法ダメージ率
 * @value MDR
 * @option 地面傷害率 / Floor Damage Rate / 床ダメージ率
 * @value FDR
 * @option 經驗值倍率 / Experience Rate / 経験値倍率
 * @value EXR
 * @default ATK
 *
 * @param value
 * @text 倍率 / Multiplier / 倍率
 * @desc 參數加成倍率（可使用小數點） / Parameter bonus multiplier (decimals allowed) / パラメータボーナス倍率（小数点可）
 * @type number
 * @min 0
 * @decimals 3
 * @default 1.0
 */

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    const ignoreTagName = 'ignoreZweihander';
    const dualGripTagName = 'enableDualGrip';
    
    // 移除 originalWeaponsData 相關代碼，因為不再需要
    
    // 移除 DataManager.onLoad 的備份邏輯
    
    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        initializeDualGripBonuses();
    };

    const _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _Scene_Load_onLoadSuccess.call(this);
        initializeDualGripBonuses();
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        _Scene_Title_commandNewGame.call(this);
        setTimeout(() => {
            initializeDualGripBonuses();
        }, 100);
    };
    
    const TraitKeyMap = {
        "MHP": { code: 21, dataId: 0 },
        "MMP": { code: 21, dataId: 1 },
        "ATK": { code: 21, dataId: 2 },
        "DEF": { code: 21, dataId: 3 },
        "MAT": { code: 21, dataId: 4 },
        "MDF": { code: 21, dataId: 5 },
        "AGI": { code: 21, dataId: 6 },
        "LUK": { code: 21, dataId: 7 },
        "HIT": { code: 22, dataId: 0 },
        "EVA": { code: 22, dataId: 1 },
        "CRI": { code: 22, dataId: 2 },
        "CEV": { code: 22, dataId: 3 },
        "MEV": { code: 22, dataId: 4 },
        "MRF": { code: 22, dataId: 5 },
        "CNT": { code: 22, dataId: 6 },
        "HRG": { code: 22, dataId: 7 },
        "MRG": { code: 22, dataId: 8 },
        "TRG": { code: 22, dataId: 9 },
        "TGR": { code: 23, dataId: 0 },
        "GRD": { code: 23, dataId: 1 },
        "REC": { code: 23, dataId: 2 },
        "PHA": { code: 23, dataId: 3 },
        "MCR": { code: 23, dataId: 4 },
        "TCR": { code: 23, dataId: 5 },
        "PDR": { code: 23, dataId: 6 },
        "MDR": { code: 23, dataId: 7 },
        "FDR": { code: 23, dataId: 8 },
        "EXR": { code: 23, dataId: 9 }
    };
    
    const DualGripBonusData = param.dualGripBonuses.map(item => {
        return { key: item.param, value: parseFloat(item.value) };
    }).filter(item => item.key && TraitKeyMap[item.key]);

    function initializeDualGripBonuses() {
        // 初始化時檢測並修正角色的裝備狀態
        if (!$gameParty || !$gameParty._actors || !$dataWeapons || !$dataArmors) return;
        
        // 確保所有角色數據都已載入
        if (!$gameActors) return;
        
        $gameParty.members().forEach(actor => {
            if (actor) {
                // 檢查並修正當前裝備狀態
                validateAndCorrectActorEquipment(actor);
                // 刷新角色狀態
                actor.refresh();
            }
        });
    }

    function validateAndCorrectActorEquipment(actor) {
        // 檢查是否可以忽略雙手武器限制
        if (actor.canIgnoreZweihander()) {
            // 可以忽略限制，不需要修正
            console.log(`初始化：角色 ${actor.name()} 可以忽略雙手武器限制，跳過檢查`);
            return;
        }

        const weapon0 = actor._equips[0] ? actor._equips[0].object() : null;
        const weapon1 = actor._equips[1] ? actor._equips[1].object() : null;
        
        console.log(`初始化：檢查角色 ${actor.name()} 的裝備狀態`);
        console.log(`  主手武器：${weapon0 ? weapon0.name : '無'}`);
        console.log(`  副手裝備：${weapon1 ? weapon1.name : '無'}`);
        console.log(`  雙武器模式：${actor.isDualWield() ? '是' : '否'}`);
        
        // 檢查雙手武器與盾牌/副手武器的衝突
        if (weapon0 && DataManager.isZweihanderWeapon(weapon0)) {
            // 主手是雙手武器，檢查是否有副手裝備
            if (weapon1 || (actor._equips[1] && actor._equips[1]._itemId > 0)) {
                // 有副手裝備，需要卸除副手
                console.log(`初始化：角色 ${actor.name()} 裝備雙手武器 ${weapon0.name}，自動卸除副手裝備`);
                forceUnequipSlot(actor, 1);
            }
        } else if (weapon1 && DataManager.isZweihanderWeapon(weapon1)) {
            // 副手是雙手武器（雙武器模式），需要移到主手
            if (actor.isDualWield()) {
                console.log(`初始化：角色 ${actor.name()} 副手裝備雙手武器 ${weapon1.name}，移動到主手`);
                // 卸除主手武器
                if (weapon0) {
                    forceUnequipSlot(actor, 0);
                }
                // 將副手的雙手武器移到主手
                const zweihanderWeapon = weapon1;
                forceUnequipSlot(actor, 1);
                actor._equips[0].setObject(zweihanderWeapon);
            }
        }

        // 檢查盾牌與雙手武器的衝突
        if (!actor.isDualWield() && weapon1 && !DataManager.isWeapon(weapon1)) {
            // 裝備了盾牌，檢查主手是否是雙手武器
            if (weapon0 && DataManager.isZweihanderWeapon(weapon0)) {
                console.log(`初始化：角色 ${actor.name()} 同時裝備雙手武器和盾牌，自動卸除盾牌`);
                forceUnequipSlot(actor, 1);
            }
        }

        // 檢查雙武器模式下的衝突
        if (actor.isDualWield() && weapon0 && weapon1) {
            // 雙武器模式，檢查是否有雙手武器
            if (DataManager.isZweihanderWeapon(weapon0)) {
                console.log(`初始化：角色 ${actor.name()} 雙武器模式下主手裝備雙手武器，自動卸除副手`);
                forceUnequipSlot(actor, 1);
            } else if (DataManager.isZweihanderWeapon(weapon1)) {
                console.log(`初始化：角色 ${actor.name()} 雙武器模式下副手裝備雙手武器，移動到主手`);
                // 將副手的雙手武器移到主手
                const zweihanderWeapon = weapon1;
                forceUnequipSlot(actor, 0);
                forceUnequipSlot(actor, 1);
                actor._equips[0].setObject(zweihanderWeapon);
            }
        }
        
        console.log(`初始化：角色 ${actor.name()} 裝備狀態檢查完成`);
    }

    function forceUnequipSlot(actor, slotId) {
        // 強制卸除指定槽位的裝備（交易回物品欄）
        if (actor._equips[slotId] && actor._equips[slotId]._itemId > 0) {
            const item = actor._equips[slotId].object();
            if (item) {
                console.log(`  強制卸除槽位 ${slotId} 的裝備：${item.name}`);
                // 交易回物品欄
                actor.tradeItemWithParty(null, item);
            }
            actor._equips[slotId].setObject(null);
        }
    }

    function shouldApplyDualGripBonus(actor, weapon, otherWeapon) {
        const equipExists = weapon ? true : false;
        const isWeapon = DataManager.isWeapon(weapon);
        const isZweihanderWeapon = DataManager.isZweihanderWeapon(weapon);
        const otherEquipExists = otherWeapon ? true : false;
        const hasDualGripSkill = actor.hasDualGripSkill();
        return equipExists && isWeapon && !isZweihanderWeapon && !otherEquipExists && hasDualGripSkill;
    }

    DataManager.isZweihanderWeapon = function(item) {
        if (!this.isWeapon(item)) return false;
        
        // 優先檢查 meta 資料
        const isZweihanderMeta = item.meta && item.meta.isZweihander === true;
        
        // 如果 meta 沒有設定，檢查 note 標籤（向後兼容）
        const isZweihanderNote = item.note && item.note.includes('<isZweihander:true>');
        
        return isZweihanderMeta || isZweihanderNote;
    };

    Game_Actor.prototype.hasDualGripSkill = function() {
        // 先檢查裝備優先級
        const equipmentResult = checkEquipmentDualGripSkill(this);
        if (equipmentResult !== null) {
            return equipmentResult;
        }
        
        // 裝備都沒設定時，檢查角色設定
        const actorResult = checkActorDualGripSkill(this);
        if (actorResult !== null) {
            return actorResult;
        }
        
        // 角色沒設定時，檢查職業設定
        const classResult = checkClassDualGripSkill(this);
        if (classResult !== null) {
            return classResult;
        }
        
        // 默認沒有雙手持技能
        return false;
    };

    function checkEquipmentDualGripSkill(actor) {
        const equippedItems = actor.weapons().concat(actor.armors());
        console.log(equippedItems);
        let hasTrue = false;
        let hasFalse = false;
        
        for (const item of equippedItems) {
            if (item && item.meta) {
                const metaValue = item.meta[dualGripTagName];
                if (metaValue === true || metaValue === 'true') {
                    hasTrue = true;
                } else if (metaValue === false || metaValue === 'false') {
                    hasFalse = true;
                }
            }
        }
        
        // 如果有任何裝備設定為 false，返回 false
        if (hasFalse) {
            return false;
        }
        
        // 如果有任何裝備設定為 true，返回 true
        if (hasTrue) {
            return true;
        }
        
        // 所有裝備都沒有設定，返回 null 表示需要檢查下一優先級
        return null;
    }

    function checkActorDualGripSkill(actor) {
        const actorMeta = actor.actor().meta;
        if (actorMeta && actorMeta[dualGripTagName] !== undefined) {
            return actorMeta[dualGripTagName] === true;
        }
        
        // 沒有設定，返回 null 表示需要檢查下一優先級
        return null;
    }

    function checkClassDualGripSkill(actor) {
        const classMeta = actor.currentClass().meta;
        if (classMeta && classMeta[dualGripTagName] !== undefined) {
            return classMeta[dualGripTagName] === true;
        }
        
        // 沒有設定，返回 null 表示使用默認值
        return null;
    }

    // 移除原本的 applyDualGripBonusTraits 和 removeDualGripBonusTraits 函數
    // 改為動態計算雙手持加成
    Game_Actor.prototype.getDualGripBonusTraits = function() {
        const weapon0 = this._equips[0] ? this._equips[0].object() : null;
        const weapon1 = this._equips[1] ? this._equips[1].object() : null;
        
        const traits = [];
        
        // 檢查主手武器是否符合雙手持條件
        if (shouldApplyDualGripBonus(this, weapon0, weapon1)) {
            traits.push(...this.createDualGripBonusTraits());
        }
        
        // 檢查副手武器是否符合雙手持條件（雙武器模式）
        if (shouldApplyDualGripBonus(this, weapon1, weapon0)) {
            traits.push(...this.createDualGripBonusTraits());
        }
        
        return traits;
    };

    Game_Actor.prototype.createDualGripBonusTraits = function() {
        const traits = [];
        
        DualGripBonusData.forEach(entry => {
            const trait = TraitKeyMap[entry.key];
            if (!trait) return;
            
            traits.push({
                code: trait.code,
                dataId: trait.dataId,
                value: entry.value
            });
        });
        
        return traits;
    };

    // 重寫 traitObjects 方法來動態添加雙手持加成
    const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        const objects = _Game_Actor_traitObjects.call(this);
        
        // 動態添加雙手持加成
        const dualGripBonusTraits = this.getDualGripBonusTraits();
        if (dualGripBonusTraits.length > 0) {
            // 創建一個虛擬物件來承載雙手持加成
            const dualGripObject = {
                traits: dualGripBonusTraits
            };
            objects.push(dualGripObject);
        }
        
        return objects;
    };

    // 移除原本的 applyDualGripBonusIfNeeded 函數
    // 移除原本的 applyDualGripBonusTraits 函數
    // 移除原本的 removeDualGripBonusTraits 函數

    Game_Actor.prototype.canIgnoreZweihander = function() {
        // 先檢查裝備優先級
        const equipmentResult = checkEquipmentIgnoreTag(this);
        console.log(equipmentResult);
        if (equipmentResult !== null) {
            return equipmentResult;
        }
        
        // 裝備都沒設定時，檢查角色設定
        const actorResult = checkActorIgnoreTag(this);
        if (actorResult !== null) {
            return actorResult;
        }
        
        // 角色沒設定時，檢查職業設定
        const classResult = checkClassIgnoreTag(this);
        if (classResult !== null) {
            return classResult;
        }
        
        // 默認不能忽略
        return false;
    };

    function checkEquipmentIgnoreTag(actor) {
        const equippedItems = actor.weapons().concat(actor.armors());
        let hasTrue = false;
        let hasFalse = false;
        
        for (const item of equippedItems) {
            if (item && item.meta) {
                const metaValue = item.meta[ignoreTagName];
                if (metaValue === true || metaValue === 'true') {
                    hasTrue = true;
                } else if (metaValue === false || metaValue === 'false') {
                    hasFalse = true;
                }
            }
        }
        
        // 如果有任何裝備設定為 false，返回 false
        if (hasFalse) {
            return false;
        }
        
        // 如果有任何裝備設定為 true，返回 true
        if (hasTrue) {
            return true;
        }
        
        // 所有裝備都沒有設定，返回 null 表示需要檢查下一優先級
        return null;
    }

    function checkActorIgnoreTag(actor) {
        const actorMeta = actor.actor().meta;
        if (actorMeta && actorMeta[ignoreTagName] !== undefined) {
            return actorMeta[ignoreTagName] === true;
        }
        
        // 沒有設定，返回 null 表示需要檢查下一優先級
        return null;
    }

    function checkClassIgnoreTag(actor) {
        const classMeta = actor.currentClass().meta;
        if (classMeta && classMeta[ignoreTagName] !== undefined) {
            return classMeta[ignoreTagName] === true;
        }
        
        // 沒有設定，返回 null 表示使用默認值
        return null;
    }

    Game_Actor.prototype.hasZweihanderEquipped = function() {
        return this.weapons().some(weapon => DataManager.isZweihanderWeapon(weapon));
    };

    Game_Actor.prototype.hasShieldEquipped = function() {
        const shieldItem = this._equips[1];
        return shieldItem && shieldItem._itemId > 0;
    };

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        if (slotId > 1) {
            handleArmorEquipChange(this, slotId, item);
            return;
        }
        
        if (this.canIgnoreZweihander()) {
            _Game_Actor_changeEquip.apply(this, arguments);
            // 動態計算，不需要手動更新雙手持加成
            return;
        }

        if (slotId === 0) {
            handleMainWeaponEquip(this, item);
        } else if (slotId === 1) {
            handleOffhandEquip(this, item);
        }
        
        // 動態計算，不需要手動更新雙手持加成
    };

    function handleArmorEquipChange(actor, slotId, item) {
        const currentIgnoreResult = actor.canIgnoreZweihander();
        
        _Game_Actor_changeEquip.call(actor, slotId, item);
        
        const newIgnoreResult = actor.canIgnoreZweihander();
        
        if (currentIgnoreResult && !newIgnoreResult) {
            forceRemoveConflictingEquipment(actor);
        }
    }

    function forceRemoveConflictingEquipment(actor) {
        if (actor._equips[0] && actor._equips[1] && 
            (DataManager.isZweihanderWeapon(actor._equips[0].object()) || 
             DataManager.isZweihanderWeapon(actor._equips[1].object()))) {
            
            if (actor._equips[1] && actor._equips[1]._itemId > 0) {
                actor.tradeItemWithParty(null, actor._equips[1].object());
                actor._equips[1].setObject(null);
            }
        }
    }

    function handleMainWeaponEquip(actor, item) {
        if (DataManager.isZweihanderWeapon(item)) {
            _Game_Actor_changeEquip.call(actor, 0, item);
            removeShieldAfterZweihanderEquip(actor);
        } else {
            _Game_Actor_changeEquip.call(actor, 0, item);
        }
    }

    function removeShieldAfterZweihanderEquip(actor) {
        if (actor._equips[1] && actor._equips[1]._itemId > 0) {
            actor.tradeItemWithParty(null, actor._equips[1].object());
            actor._equips[1].setObject(null);
        }
    }

    function handleOffhandEquip(actor, item) {
        if (actor.isDualWield()) {
            handleDualWieldOffhandEquip(actor, item);
        } else {
            handleShieldEquip(actor, item);
        }
    }

    function handleDualWieldOffhandEquip(actor, item) {
        if (DataManager.isZweihanderWeapon(item)) {
            removeMainWeaponForZweihander(actor);
            actor.changeEquip(0, item);
        } else if (DataManager.isWeapon(item) && !DataManager.isZweihanderWeapon(item)) {
            const slot0Weapon = actor._equips[0].object();
            
            if (slot0Weapon && DataManager.isZweihanderWeapon(slot0Weapon)) {
                actor.tradeItemWithParty(null, slot0Weapon);
                actor._equips[0].setObject(null);
                actor.changeEquip(0, item);
            } else if (!slot0Weapon) {
                actor.changeEquip(0, item);
            } else {
                _Game_Actor_changeEquip.call(actor, 1, item);
            }
        }
    }

    function removeMainWeaponForZweihander(actor) {
        if (actor._equips[0] && actor._equips[0]._itemId > 0) {
            actor.tradeItemWithParty(null, actor._equips[0].object());
            actor._equips[0].setObject(null);
        }
    }

    function handleShieldEquip(actor, item) {
        if (item && actor.hasZweihanderEquipped()) {
            removeZweihanderForShield(actor);
        }
        _Game_Actor_changeEquip.call(actor, 1, item);
    }

    function removeZweihanderForShield(actor) {
        const weapon = actor._equips[0].object();
        if (DataManager.isZweihanderWeapon(weapon)) {
            actor.tradeItemWithParty(null, weapon);
            actor._equips[0].setObject(null);
        }
    }

    // 移除 updateDualGripBonusAfterEquip 及其相關函數
    // 因為我們已經改為動態計算，不需要手動更新雙手持加成

    const _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        if (slotId > 1) {
            handleArmorForceEquipChange(this, slotId, item);
            return;
        }
        
        if (this.canIgnoreZweihander()) {
            _Game_Actor_forceChangeEquip.apply(this, arguments);
            // 動態計算，不需要手動更新雙手持加成
            return;
        }

        if (slotId === 0) {
            handleMainWeaponForceEquip(this, item);
        } else if (slotId === 1) {
            handleOffhandForceEquip(this, item);
        }
        
        // 動態計算，不需要手動更新雙手持加成
    };

    function handleArmorForceEquipChange(actor, slotId, item) {
        const currentIgnoreResult = actor.canIgnoreZweihander();
        
        _Game_Actor_forceChangeEquip.call(actor, slotId, item);
        
        const newIgnoreResult = actor.canIgnoreZweihander();
        
        if (currentIgnoreResult && !newIgnoreResult) {
            forceRemoveConflictingEquipmentNoTrade(actor);
        }
    }

    function forceRemoveConflictingEquipmentNoTrade(actor) {
        if (actor._equips[0] && actor._equips[1] && 
            (DataManager.isZweihanderWeapon(actor._equips[0].object()) || 
             DataManager.isZweihanderWeapon(actor._equips[1].object()))) {
            
            if (actor._equips[1] && actor._equips[1]._itemId > 0) {
                actor._equips[1].setObject(null);
            }
        }
    }

    function handleMainWeaponForceEquip(actor, item) {
        if (DataManager.isZweihanderWeapon(item)) {
            _Game_Actor_forceChangeEquip.call(actor, 0, item);
            forceRemoveShieldAfterZweihanderEquip(actor);
        } else {
            _Game_Actor_forceChangeEquip.call(actor, 0, item);
        }
    }

    function forceRemoveShieldAfterZweihanderEquip(actor) {
        if (actor._equips[1] && actor._equips[1]._itemId > 0) {
            actor._equips[1].setObject(null);
        }
    }

    function handleOffhandForceEquip(actor, item) {
        if (actor.isDualWield()) {
            handleDualWieldOffhandForceEquip(actor, item);
        } else {
            handleShieldForceEquip(actor, item);
        }
    }

    function handleDualWieldOffhandForceEquip(actor, item) {
        if (DataManager.isZweihanderWeapon(item)) {
            forceRemoveMainWeaponForZweihander(actor);
            actor.forceChangeEquip(0, item);
        } else if (DataManager.isWeapon(item) && !DataManager.isZweihanderWeapon(item)) {
            const slot0Weapon = actor._equips[0].object();
            
            if (slot0Weapon && DataManager.isZweihanderWeapon(slot0Weapon)) {
                actor._equips[0].setObject(null);
                actor.forceChangeEquip(0, item);
            } else if (!slot0Weapon) {
                actor.forceChangeEquip(0, item);
            } else {
                _Game_Actor_forceChangeEquip.call(actor, 1, item);
            }
        }
    }

    function forceRemoveMainWeaponForZweihander(actor) {
        if (actor._equips[0] && actor._equips[0]._itemId > 0) {
            actor._equips[0].setObject(null);
        }
    }

    function handleShieldForceEquip(actor, item) {
        if (item && actor.hasZweihanderEquipped()) {
            forceRemoveZweihanderForShield(actor);
        }
        _Game_Actor_forceChangeEquip.call(actor, 1, item);
    }

    function forceRemoveZweihanderForShield(actor) {
        const weapon = actor._equips[0].object();
        if (DataManager.isZweihanderWeapon(weapon)) {
            actor._equips[0].setObject(null);
        }
    }

})(); 