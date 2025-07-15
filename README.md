# 自定義雙手武器插件 / Custom Two-Handed Weapon Plugin / カスタム両手武器プラグイン

## 基本信息 / Basic Information / 基本情報

- **插件名稱**: NNNN_ZweihanderCustom.js
- **版本**: v1.1.0  
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
<isZweihander:true>  <!-- 標記為雙手武器 -->
```

**或使用 meta 標籤** / **Or use meta tags** / **またはメタタグを使用**：
```html
<isZweihander>  <!-- 簡化的 meta 標籤寫法 -->
```

### 👤 角色標籤 / Actor Tags / アクタータグ

```html
<ignoreZweihander:true>   <!-- 可以忽略雙手武器限制 -->
<ignoreZweihander:false>  <!-- 強制不能忽略限制 -->
<enableDualGrip:true>     <!-- 擁有雙手持技能 -->
```

**或使用 meta 標籤** / **Or use meta tags** / **またはメタタグを使用**：
```html
<ignoreZweihander>   <!-- 簡化的 meta 標籤寫法 -->
<enableDualGrip>     <!-- 簡化的 meta 標籤寫法 -->
```

### 🎭 職業標籤 / Class Tags / 職業タグ

```html
<ignoreZweihander:true>   <!-- 該職業可以忽略限制 -->
<enableDualGrip:true>     <!-- 該職業擁有雙手持技能 -->
```

**或使用 meta 標籤** / **Or use meta tags** / **またはメタタグを使用**：
```html
<ignoreZweihander>   <!-- 簡化的 meta 標籤寫法 -->
<enableDualGrip>     <!-- 簡化的 meta 標籤寫法 -->
```

### 🛡️ 裝備標籤 / Equipment Tags / 装備タグ

```html
<ignoreZweihander:true>   <!-- 裝備此物品可忽略雙手武器限制 -->
<ignoreZweihander:false>  <!-- 裝備此物品禁止忽略雙手武器限制 -->
```

**優先級 / Priority / 優先度**: 
1. **裝備標籤**（任一裝備設為 `false` 則禁止，無 `false` 且有 `true` 則允許）
2. **角色設定** > **職業設定**

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
- 最大生命值 / Max HP / 最大HP
- 最大魔力值 / Max MP / 最大MP
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
- 生命回復率 / HP Regen / HP再生率
- 魔力回復率 / MP Regen / MP再生率
- 戰術點回復率 / TP Regen / TP再生率

#### 特殊參數 / Special Parameters / 特殊パラメータ
- 目標率 / Target Rate / 狙われ率
- 防禦效果率 / Guard Effect / 防御効果率
- 回復效果率 / Recovery Effect / 回復効果率
- 藥理學 / Pharmacology / 薬の知識
- 魔力消耗率 / MP Cost Rate / MP消費率
- 戰術點充能率 / TP Charge Rate / TPチャージ率
- 物理傷害率 / Physical Damage Rate / 物理ダメージ率
- 魔法傷害率 / Magic Damage Rate / 魔法ダメージ率
- 地面傷害率 / Floor Damage Rate / 床ダメージ率
- 經驗值倍率 / Experience Rate / 経験値倍率

**預設加成設定** / **Default Bonus Settings** / **デフォルトボーナス設定**：
- 攻擊力 ×1.2 / Attack ×1.2 / 攻撃力 ×1.2
- 敏捷 ×1.1 / Agility ×1.1 / 敏捷性 ×1.1
- 暴擊率 +10% / Critical Rate +10% / 会心率 +10%
- 命中率 +15% / Hit Rate +15% / 命中率 +15%
- 防禦效果率 +20% / Guard Effect Rate +20% / 防御効果率 +20%

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

#### 範例1：基本雙手劍 / Example 1: Basic Two-Handed Sword / 例1：基本両手剣

```
武器：巨劍
備註欄：<isZweihander:true>
效果：裝備時自動卸下盾牌
```

#### 範例2：特殊角色 / Example 2: Special Character / 例2：特別キャラクター

```
角色：劍聖
備註欄：<ignoreZweihander:true>
效果：可以同時裝備雙手武器和盾牌
```

#### 範例3：雙手持技能角色 / Example 3: Dual Grip Skill Character / 例3：両手持ちスキルキャラクター

```
角色：劍客
備註欄：<enableDualGrip:true>
效果：單手武器+空副手時獲得配置的能力加成
```

#### 範例4：特殊裝備 / Example 4: Special Equipment / 例4：特殊装備

```
防具：雙手護腕
備註欄：<ignoreZweihander:true>
效果：任何角色裝備後都可以同時使用雙手武器和盾牌
```

```
防具：束縛手套
備註欄：<ignoreZweihander:false>
效果：強制禁用雙手武器忽略功能
```

#### 範例5：插件參數配置 / Example 5: Plugin Parameter Configuration / 例5：プラグインパラメータ設定

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

### 🔍 調試工具 / Debug Tools / デバッグツール

在瀏覽器開發者工具中，可以使用以下指令進行調試：

```javascript
// 檢查角色是否有雙手持技能
$gameParty.leader().hasDualGripSkill()

// 檢查角色是否可以忽略雙手武器限制
$gameParty.leader().canIgnoreZweihander()

// 檢查當前的雙手持加成特性
$gameParty.leader().getDualGripBonusTraits()

// 檢查武器是否為雙手武器
DataManager.isZweihanderWeapon($dataWeapons[1])
```

## 技術規格 / Technical Specifications / 技術仕様

## 注意事項 / Important Notes / 注意事項

### v1.1.0 (2025/07/15)
- ✅ 新增可配置的雙手持技能系統
- ✅ 新增裝備標籤支援
- ✅ 實現動態計算機制
- ✅ 完善防具裝備時的動態檢查
- ✅ 新增 Meta 標籤支援
- ✅ 優化性能和代碼結構
- ✅ 新增完整的插件參數配置
- ✅ 優化程式碼註解和文檔


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
**A**: 使用動態計算系統，對性能影響很小。如有大量角色建議適度使用。

## 授權條款 / License / ライセンス

MIT License - Copyright (c) 2025 NeNeNeNeTai

