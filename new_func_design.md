# 雙手持技能加成系統（DualGripBonus）(待完成)

## 1. 功能描述

實作一套「雙手持技能加成系統」，當角色裝備單手武器（非雙手武器）且副手為空，並且擁有雙手持技能時，自動在主武器裝備上套用額外的能力值加成。此系統支援基本能力（param）、追加能力（exparam）、特殊能力（sparam）的加成，並透過外部資料模組化管理，便於後續擴充與調整。

---

## 2. 新增參數（含參數說明與功能）

```js
const DualGripBonusData = [
  { key: "ATK", value: 1.2 },  // 攻擊力 x1.2
  { key: "AGI", value: 1.1 },  // 敏捷 x1.1
  { key: "CRI", value: 0.1 },  // 暴擊率 +10%
  { key: "HIT", value: 0.15 }, // 命中率 +15%
  { key: "GRD", value: 0.2 }   // 防禦效果率 +20%
];
key：加成對應的能力代碼（對應 TraitKeyMap）

value：加成數值（倍率或百分比）

3. 新增標籤（含標籤說明與功能）
<enableDualGrip:true>
功能：啟用雙手持技能加成系統的識別標籤。

使用位置：角色或職業資料中。

判斷依據：角色是否具備雙手持技能，可透過 hasDualGripSkill() 進行判斷。

4. 實作概念
✅ 加成處理邏輯：applyDualGripBonusTraits(item)

function applyDualGripBonusTraits(item) {
  DualGripBonusData.forEach(entry => {
    const trait = TraitKeyMap[entry.key];
    if (!trait) return;

    const existingTrait = item.traits.find(t =>
      t.code === trait.code && t.dataId === trait.dataId
    );

    if (existingTrait) {
      existingTrait.value += entry.value;
    } else {
      item.traits.push({
        code: trait.code,
        dataId: trait.dataId,
        value: entry.value
      });
    }
  });
}
🔗 Trait 對應表：TraitKeyMap

const TraitKeyMap = {
  // param
  "ATK": { code: 21, dataId: 2 },
  "AGI": { code: 21, dataId: 6 },
  // xparam
  "CRI": { code: 22, dataId: 2 },
  "HIT": { code: 22, dataId: 0 },
  // sparam
  "GRD": { code: 23, dataId: 1 }
};
🔄 整合流程：裝備變更流程整合
於 Game_Actor.prototype.changeEquip 中插入以下邏輯：

if (
  slotId === 0 &&
  item &&
  !DataManager.isZweihanderWeapon(item) &&
  this.hasDualGripSkill() &&
  !this.equips()[1]
) {
  applyDualGripBonusTraits(item);
}
📌 判斷條件整合
判斷主手是否為單手武器

副手是否為空

是否擁有雙手持技能（可透過角色標籤 <enableDualGrip:true> 判斷）

5. 補充說明
hasDualGripSkill() 為自定義函式，用來判斷角色是否啟用雙手持加成條件（可依標籤、技能或職業設定判斷）。

加成效果直接加在主手武器的 traits 陣列中，裝備即時生效，無需額外處理。

若裝備變更或條件不符時，可透過流程重置 traits 再重新套用，確保一致性。

加成資料與對應 trait code/dataId 採模組化設計，日後僅需新增對應 key/value 即可擴充支援更多能力類型。