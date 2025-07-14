# 自定義雙手武器插件 / Custom Two-Handed Weapon Plugin / カスタム両手武器プラグイン

## 基本信息 / Basic Information / 基本情報

- **插件名稱**: NNNN_ZweihanderCustom.js
- **版本**: v1.0.0  
- **作者**: NeNeNeNeTai
- **類型**: Equipment System Plugin
- **相容性**: RPG Maker MZ
- **授權**: MIT License

## 功能概述 / Feature Overview / 機能概要

### 🎯 主要功能 / Main Features / 主な機能

**繁體中文**：
這個插件允許帶有特定標籤的武器自動卸下盾牌，實現真正的雙手武器系統。同時提供角色特性來忽略此限制，增加裝備系統的策略深度。

**English**：
This plugin allows weapons with specific tags to automatically unequip shields, implementing a true two-handed weapon system. Also provides character traits to ignore this restriction, adding strategic depth to the equipment system.

**日本語**：
このプラグインは特定のタグを持つ武器が自動的に盾を外すことを可能にし、真の両手武器システムを実装します。また、この制限を無視するキャラクター特性も提供し、装備システムに戦略的深度を追加します。

## 標籤設定 / Tag Configuration / タグ設定

### 🗡️ 武器標籤 / Weapon Tags / 武器タグ

```html
<isZweihander:true>  <!-- 標記為雙手武器 -->
```

### 👤 角色標籤 / Actor Tags / アクタータグ

```html
<ignoreZweihander:true>   <!-- 可以忽略雙手武器限制 -->
<ignoreZweihander:false>  <!-- 強制不能忽略限制 -->
```

### 🎭 職業標籤 / Class Tags / 職業タグ

```html
<ignoreZweihander:true>   <!-- 該職業可以忽略限制 -->
```

**優先級**: 角色設定 > 職業設定

## 核心機制 / Core Mechanics / コアメカニズム

### 🔧 裝備邏輯 / Equipment Logic / 装備ロジック

1. **裝備雙手武器時**：
   - 自動卸下盾牌（槽位2）或已經裝備的武器(槽位1或2)
   - 擁有忽略標籤的角色不受影響

2. **裝備盾牌時**：
   - 如果當前武器是雙手武器，自動卸下武器
   - 擁有忽略標籤的角色不受影響

3. **雙武器模式**：
   - 處理雙手武器的裝備位置
   - 自動調整武器槽位配置

## 使用方法 / Usage Instructions / 使用方法

### 🚀 基本設置 / Basic Setup / 基本設定

1. 在插件管理器中啟用插件
2. 為武器添加 `<isZweihander:true>` 標籤
3. 為特殊角色或職業添加忽略標籤（可選）
4. 測試裝備系統是否正常運作

### 📝 設定範例 / Setup Examples / 設定例

#### 範例1：雙手劍 / Example 1: Two-Handed Sword / 例1：両手剣

```
武器：巨劍
備註欄：<isZweihander:true>
效果：裝備時會自動卸下盾牌或另一個位置的武器
```

#### 範例2：特殊角色 / Example 2: Special Character / 例2：特別キャラクター

```
角色：狂戰士
備註欄：<ignoreZweihander:true>
效果：可以裝備二把雙手武器或雙手武器加盾牌
```

## 測試指南 / Testing Guide / テストガイド

### 🧪 基本測試 / Basic Testing / 基本テスト

1. **雙手武器測試**：
   - 裝備標記為雙手武器的武器
   - 確認盾牌被自動卸下

2. **忽略限制測試**：
   - 使用有忽略標籤的角色
   - 確認可以同時裝備雙手武器和盾牌

3. **雙武器模式測試**：
   - 在雙武器模式下測試各種裝備組合
   - 確認系統智能處理裝備位置

## 注意事項 / Important Notes / 注意事項

### ⚠️ 使用限制 / Usage Limitations / 使用制限

- 僅影響武器和盾牌的裝備邏輯
- 不影響遊戲的其他系統
- 角色設定優先於職業設定
- 在雙武器模式下有特殊處理邏輯

## 5. 版權聲明

**授權條款:** MIT License  
**商業使用:** ✅ 允許  
**二次開發:** ✅ 允許  
**轉售權限:** ❌ 禁止轉售原插件  
**署名要求:** 建議保留原作者資訊  
