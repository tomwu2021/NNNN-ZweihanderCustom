# 自定義雙手武器插件 / Custom Two-Handed Weapon Plugin / カスタム両手武器プラグイン

## 基本信息 / Basic Information / 基本情報

- **插件名稱**: NNNN_ZweihanderCustom.js
- **版本**: v1.2.0
- **作者**: NeNeNeNeTai
- **類型**: Equipment System Plugin
- **相容性**: RPG Maker MZ
- **授權**: MIT License

## 功能概述 / Feature Overview / 機能概要

### 🎯 主要功能 / Main Features / 主な機能

**繁體中文**：
這個插件實現了完整的雙手武器系統，允許帶有特定標籤的武器自動卸下盾牌。同時提供角色、職業和裝備特性來忽略此限制。新增可配置的雙手持技能系統，當角色裝備單手武器且副手為空時，可獲得額外能力加成。系統採用動態計算機制，確保性能優化和功能穩定。

**English**：
This plugin implements a complete two-handed weapon system that allows weapons with specific tags to automatically unequip shields. It provides character, class, and equipment traits to ignore this restriction. The new configurable dual grip skill system grants extra ability bonuses when characters equip single-handed weapons with empty off-hand. The system uses dynamic calculation mechanisms to ensure performance optimization and functional stability.

**日本語**：
このプラグインは、特定のタグを持つ武器が自動的に盾を外す完全な両手武器システムを実装します。キャラクター、職業、装備特性によりこの制限を無視できます。新しい設定可能な両手持ちスキルシステムでは、片手武器を装備し副手が空の時に追加能力ボーナスを得ます。システムは動的計算メカニズムを使用し、性能最適化と機能安定性を保証します。

## 標籤設定 / Tag Configuration / タグ設定

### 🗡️ 武器標籤 / Weapon Tags / 武器タグ

```html
<isZweihander:true>
```

### 👤 角色標籤 / Actor Tags / アクタータグ

```html
<ignoreZweihander:true>
<!-- 可以忽略雙手武器限制 -->
<ignoreZweihander:false>
<!-- 強制不能忽略限制 -->
<enableDualGrip:true>
<!-- 擁有雙手持技能 -->
```

### 🎭 職業標籤 / Class Tags / 職業タグ

```html
<ignoreZweihander:true>
<!-- 該職業可以忽略限制 -->
<enableDualGrip:true>
<!-- 該職業擁有雙手持技能 -->
```

### 🛡️ 裝備標籤 / Equipment Tags / 装備タグ

**防具和飾品可使用相同標籤** / **Armors and Accessories can use same tags** / **防具とアクセサリーは同じタグを使用可能**：

```html
<ignoreZweihander:true>
<!-- 裝備此物品可忽略雙手武器限制 -->
<ignoreZweihander:false>
<!-- 裝備此物品禁止忽略雙手武器限制 -->
<enableDualGrip:true>
<!-- 裝備此防具可獲得雙手持技能 -->
<enableDualGrip:false>
<!-- 裝備此防具禁止雙手持技能 -->
```

### 🔄 優先級順序 / Priority Order / 優先度順位

1. **裝備標籤**（最高優先級 / Highest Priority / 最高優先度）

   - 任一裝備設為 `false` → 強制禁用
   - 無裝備設為 `false` 且有裝備設為 `true` → 啟用
   - 全部未設定 → 檢查下一級

   - Any equipment set to `false` → Force disable
   - No `false` and has `true` → Enable
   - All unset → Check next Priority

   - いずれかの装備が `false` → 強制無効
   - 装備が`false`なしで`true`あり → 有効
   - 全て未設定 → 次の優先度をチェック



2. **角色設定**（中等優先級 / Medium Priority / 中優先度）

   - 有設定 → 使用該值
   - 未設定 → 檢查下一級

   - 設定あり → その値を使用
   - 未設定 → 次の優先度をチェック

   - setting → use that value
   - unset → check next Priority


3. **職業設定**（最低優先級 / Lowest Priority / 最低優先度）

   - 有設定 → 使用該值
   - 未設定 → 使用預設值（false）

   - setting → use that value
   - unset → use default (false)

## 核心機制 / Core Mechanics / コアメカニズム

### 🔧 裝備邏輯 / Equipment Logic / 装備ロジック

1. **裝備雙手武器時**：

   - 自動卸下盾牌或副手武器
   - 擁有忽略標籤的角色不受影響

2. **裝備盾牌時**：

   - 如果當前武器是雙手武器，自動卸下武器
   - 擁有忽略標籤的角色不受影響

3. **雙武器模式智能處理**：

   - 雙手武器會自動移至主手槽位
   - 智能處理武器槽位衝突
   - 自動調整武器配置

4. **防具裝備動態檢查**：

   - 防具變更時自動檢查忽略狀態變化
   - 當忽略狀態改變時自動調整裝備配置

5. **裝備槽鎖定處理** / **Equipment Slot Locking Smart Handling** / **装備スロットロック スマート処理**：
   - 當裝備槽被鎖定且有裝備時，會阻止衝突物品的選擇
   - 槽位 1 或 2 被鎖定且裝備盾牌時，雙手武器變為不可選擇
   - 槽位 1 或 2 被鎖定且鎖定槽位裝備雙手武器時，盾牌變為不可選擇
   - 不論槽位類型（雙武器或標準），鎖定機制均有效
   
   - When equipment slots are locked with equipment, prevents selection of conflicting items
   - If slot 1 or 2 is locked with shield equipped, two-handed weapons become unselectable
   - If slot 1 or 2 is locked with two-handed weapon equipped, shields become unselectable
   - Works regardless of slot type (dual wield or standard)

   - 装備スロットが装備でロックされている場合、競合するアイテムの選択を防ぐ
   - スロット 1 または 2 が盾でロックされている場合、両手武器は選択不可になる
   - スロット 1 または 2 が両手武器でロックされている場合、盾は選択不可になる
   - スロットタイプ（二刀流または標準）に関係なく機能する

### ⚡ 雙手持技能系統 / Dual Grip Skill System / 両手持ちスキルシステム

**動態計算機制** / **Dynamic Calculation** / **動的計算メカニズム**：

- 使用 `traitObjects` 動態計算加成
- 不修改原始武器數據
- 實時響應裝備變化

**觸發條件** / **Trigger Conditions** / **発動条件**：

- 角色或職業擁有 `<enableDualGrip:true>` 標籤
- 主手或副手裝備單手武器（非雙手武器）
- 另一隻手為空

**可配置加成** / **Configurable Bonuses** / **設定可能なボーナス**：
透過插件參數可配置所有基本參數、追加參數、特殊參數的加成倍率：

#### 基本參數 / Basic Parameters / 基本パラメータ

- 最大生命值 / Max HP / 最大 HP
- 最大魔力值 / Max MP / 最大 MP
- 攻擊力 / Attack / 攻撃力
- 防禦力 / Defense / 防御力
- 魔法攻擊力 / Magic Attack / 魔法攻撃力
- 魔法防禦力 / Magic Defense / 魔法防御力
- 敏捷 / Agility / 敏捷性
- 幸運 / Luck / 運

#### 追加參數 / Extra Parameters / 追加パラメータ

- 命中率 / Hit Rate / 命中率
- 迴避率 / Evasion Rate / 回避率
- 暴擊率 / Critical Rate / 会心率
- 暴擊迴避率 / Critical Evasion / 会心回避率
- 魔法迴避率 / Magic Evasion / 魔法回避率
- 魔法反射率 / Magic Reflection / 魔法反射率
- 反擊率 / Counter Rate / 反撃率
- 生命回復率 / HP Regen / HP 再生率
- 魔力回復率 / MP Regen / MP 再生率
- 戰術點回復率 / TP Regen / TP 再生率

#### 特殊參數 / Special Parameters / 特殊パラメータ

- 目標率 / Target Rate / 狙われ率
- 防禦效果率 / Guard Effect / 防御効果率
- 回復效果率 / Recovery Effect / 回復効果率
- 藥理學 / Pharmacology / 薬の知識
- 魔力消耗率 / MP Cost Rate / MP 消費率
- 戰術點充能率 / TP Charge Rate / TP チャージ率
- 物理傷害率 / Physical Damage Rate / 物理ダメージ率
- 魔法傷害率 / Magic Damage Rate / 魔法ダメージ率
- 地面傷害率 / Floor Damage Rate / 床ダメージ率
- 經驗值倍率 / Experience Rate / 経験値倍率

**預設加成設定** / **Default Bonus Settings** / **デフォルトボーナス設定**：

- 攻擊力 ×1.2 / Attack ×1.2 / 攻撃力 ×1.2
- 暴擊率 +10% / Critical Rate +10% / 会心率 +10%

## 使用方法 / Usage Instructions / 使用方法

### 🚀 基本設置 / Basic Setup / 基本設定

1. **啟用插件** / **Enable Plugin** / **プラグインを有効化**
2. **設置武器標籤** / **Set Weapon Tags** / **武器タグを設定**
   - 為武器添加 `<isZweihander:true>` 標籤
3. **設置角色/職業標籤** / **Set Actor/Class Tags** / **アクター/職業タグを設定**
   - 忽略限制：`<ignoreZweihander:true>`（可選）
   - 雙手持技能：`<enableDualGrip:true>`（可選）
4. **設置裝備標籤** / **Set Equipment Tags** / **装備タグを設定**
   - 特殊裝備：`<ignoreZweihander:true/false>`（可選）
5. **配置插件參數** / **Configure Plugin Parameters** / **プラグインパラメータを設定**
   - 自定義雙手持技能加成數值
6. **測試功能** / **Test Features** / **機能をテスト**

### 🎛️ 插件參數配置 / Plugin Parameter Configuration / プラグインパラメータ設定

在插件管理器中可以配置 **"雙手持技能加成設定"**：

1. **選擇參數類型** / **Select Parameter Type** / **パラメータタイプを選択**
2. **設定加成倍率** / **Set Bonus Multiplier** / **ボーナス倍率を設定**
   - 支援小數點精度到 3 位
   - 最小值：0.000
   - 建議範圍：0.8 ~ 2.0

### 📝 設定範例 / Setup Examples / 設定例

#### 範例 1：基本雙手劍 / Example 1: Basic Two-Handed Sword / 例 1：基本両手剣

```
武器：巨劍
備註欄：<isZweihander:true>
效果：裝備時自動卸下盾牌
```

#### 範例 2：特殊角色 / Example 2: Special Character / 例 2：特別キャラクター

```
角色：劍聖
備註欄：<ignoreZweihander:true>
效果：可以同時裝備雙手武器和盾牌或兩把雙手武器
```

#### 範例 3：雙手持技能角色 / Example 3: Dual Grip Skill Character / 例 3：両手持ちスキルキャラクター

```
職業：劍客
備註欄：<enableDualGrip:true>
效果：單手武器+空副手時獲得配置的能力加成
```

#### 範例 4：裝備標籤應用 / Example 5: Equipment Tag Applications / 例 5：装備タグ応用

```
防具：雙手護腕
備註欄：<ignoreZweihander:true>
效果：任何角色裝備後都可以同時使用雙手武器和盾牌
```

```
防具：束縛手套
備註欄：<ignoreZweihander:false>
效果：強制禁用雙手武器忽略功能，即使角色或職業有忽略設定
```

```
飾品：雙手持指環
備註欄：<enableDualGrip:true>
效果：任何角色裝備後都可獲得雙手持技能加成
```

```
飾品：笨拙手套
備註欄：<enableDualGrip:false>
效果：強制禁用雙手持技能，即使角色或職業有該技能
```

#### 範例 6：優先級系統演示 / Example 6: Priority System Demonstration / 例 6：優先度システム実演

```
情況1：裝備最優先
角色：<ignoreZweihander:true>
裝備：束縛手套 <ignoreZweihander:false>
結果：false（裝備的false覆蓋角色的true）

情況2：裝備啟用
角色：無設定
裝備：雙手護腕 <ignoreZweihander:true>
結果：true（裝備啟用功能）

情況3：角色優先於職業
角色：<enableDualGrip:false>
職業：<enableDualGrip:true>
結果：false（角色設定優先）
```

#### 範例 7：插件參數配置 / Example 7: Plugin Parameter Configuration / 例 7：プラグインパラメータ設定

```
參數1：ATK，倍率：1.5（攻擊力+50%）
參數2：CRI，倍率：0.2（暴擊率+20%）
參數3：DEF，倍率：0.8（防禦力-20%）
```

## 測試指南 / Testing Guide / テストガイド

### 🧪 功能測試 / Feature Testing / 機能テスト

1. **雙手武器限制測試**：

   - 裝備雙手武器，確認盾牌被自動卸下
   - 裝備盾牌，確認雙手武器被自動卸下

2. **忽略限制測試**：

   - 角色/職業忽略標籤測試
   - 裝備忽略標籤測試
   - 優先級測試

3. **雙武器模式測試**：

   - 雙手武器在雙武器模式下的智能處理
   - 槽位自動調整功能

4. **雙手持技能測試**：

   - 確認觸發條件正確
   - 檢查能力值加成效果
   - 測試動態計算機制

5. **防具動態檢查測試**：

   - 裝備/卸下帶有忽略標籤的防具
   - 確認忽略狀態變化時的自動調整

6. **插件參數測試**：

   - 修改參數配置並測試效果
   - 測試各種參數類型的加成

7. **裝備標籤優先級測試** / **Equipment Tag Priority Testing** / **装備タグ優先度テスト**：

   - 測試裝備標籤覆蓋角色/職業設定
   - 驗證一票否決制（任一 false 覆蓋所有 true）
   - 測試多件裝備的標籤交互作用
   - Test equipment tags overriding actor/class settings
   - Verify veto system (any false overrides all true)
   - Test interaction between multiple equipment tags

8. **裝備槽鎖定測試** / **Equipment Slot Locking Testing** / **装備スロットロックテスト**：
   - 鎖定盾牌槽位，確認雙手武器不可選擇
   - 鎖定雙手武器槽位，確認盾牌不可選擇
   - 測試雙武器模式下的鎖定行為
   - Lock shield slot, confirm two-handed weapons are unselectable
   - Lock two-handed weapon slot, confirm shields are unselectable
   - Test locking behavior in dual wield mode

## 技術規格 / Technical Specifications / 技術仕様

## 注意事項 / Important Notes / 注意事項

### v1.2.0 (2025/07/19)

- ✅ 新增可配置的雙手持技能系統 / Added configurable dual grip skill system / 設定可能な両手持ちスキルシステムを追加
- ✅ 新增裝備標籤支援（防具和飾品）/ Added equipment tag support (armors and accessories) / 装備タグサポートを追加（防具とアクセサリー）
- ✅ 實現優先級系統 / Implemented priority system / 優先度システムを実装
- ✅ 新增裝備槽鎖定智能處理 / Added equipment slot locking smart handling / 装備スロットロック スマート処理を追加
- ✅ 實現動態計算機制 / Implemented dynamic calculation mechanism / 動的計算メカニズムを実装
- ✅ 完善防具裝備時的動態檢查 / Enhanced dynamic checking for armor equipment / 防具装備時の動的チェックを強化
- ✅ 新增 Meta 標籤支援 / Added Meta tag support / メタタグサポートを追加
- ✅ 優化性能和代碼結構 / Optimized performance and code structure / 性能とコード構造を最適化
- ✅ 新增完整的插件參數配置（29 個參數）/ Added complete plugin parameter configuration (29 parameters) / 完全なプラグインパラメータ設定を追加（29 パラメータ）
- ✅ 優化程式碼註解和文檔 / Optimized code comments and documentation / コードコメントとドキュメントを最適化

## 常見問題 / FAQ / よくある質問

### Q: 如何讓某個角色可以同時裝備雙手武器和盾牌？

**A**: 在角色的備註欄中添加 `<ignoreZweihander:true>` 標籤即可。

### Q: 雙手持技能系統不生效？

**A**: 請確認：1) 角色有 `<enableDualGrip:true>` 標籤，2) 裝備單手武器，3) 副手為空。

### Q: 如何自定義雙手持技能的加成數值？

**A**: 在插件管理器中配置 "雙手持技能加成設定" 參數即可。

### Q: 裝備標籤的優先級如何運作？

**A**: 任一裝備設為 `false` 則禁止忽略，無 `false` 且有 `true` 則允許忽略。

### Q: 插件是否影響遊戲性能？

**A**: 使用動態計算系統，且只在初始化及更換裝備的情境作用，對整體性能影響很小。

### Q: 裝備標籤的運作方式？ / How does the equipment tag veto system work? / 装備タグはどう動作する？

**A**: 任何一件裝備設為 `false` 就會覆蓋所有其他設定。例如：角色有 `<ignoreZweihander:true>`，但裝備了 `<ignoreZweihander:false>` 的手套，最終結果是 `false`。
**A**: Any equipment set to `false` overrides all other settings. For example: if an actor has `<ignoreZweihander:true>` but equips gloves with `<ignoreZweihander:false>`, the final result is `false`.
**A**: いずれかの装備が `false` に設定されていると、他の全ての設定を上書きします。例：アクターが `<ignoreZweihander:true>` を持っていても、`<ignoreZweihander:false>` の手袋を装備すると、最終結果は `false` になります。

### Q: 為什麼我的雙手持技能沒有生效？ / Why isn't my dual grip skill working? / なぜ両手持ちスキルが効かない？

**A**: 請檢查：1) 角色/職業/裝備有 `<enableDualGrip:true>` 設定，2) 裝備的是單手武器（非雙手武器），3) 另一隻手完全為空，4) 沒有裝備 `<enableDualGrip:false>` 的物品。
**A**: Please check: 1) Actor/class/equipment has `<enableDualGrip:true>` setting, 2) Equipped weapon is single-handed (not two-handed), 3) Other hand is completely empty, 4) No equipment with `<enableDualGrip:false>` is equipped.
**A**: 確認してください：1) アクター/職業/装備に `<enableDualGrip:true>` 設定がある、2) 装備している武器が片手武器（両手武器でない）、3) もう一方の手が完全に空、4) `<enableDualGrip:false>` の装備をしていない。

### Q: 裝備槽被鎖定時為什麼某些武器選不到？ / Why can't I select certain weapons when equipment slots are locked? / 装備スロットがロックされているとき、なぜ特定の武器が選択できない？

**A**: 這是智能衝突防護機制。如果槽位被鎖定且有盾牌，系統會阻止選擇雙手武器；如果鎖定槽位有雙手武器，系統會阻止選擇盾牌，避免裝備衝突。
**A**: This is the intelligent conflict prevention mechanism. If a slot is locked with a shield, the system prevents selecting two-handed weapons; if a locked slot has a two-handed weapon, the system prevents selecting shields to avoid equipment conflicts.
**A**: これはインテリジェント競合防止メカニズムです。スロットが盾でロックされている場合、システムは両手武器の選択を防ぎ、ロックされたスロットに両手武器がある場合、システムは盾の選択を防いで装備競合を回避します。

## 授權條款 / License / ライセンス

MIT License - Copyright (c) 2025 NeNeNeNeTai
