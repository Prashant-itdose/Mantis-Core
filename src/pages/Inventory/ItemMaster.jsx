import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";

const ItemMaster = () => {
  const [t] = useTranslation();
  const [payload, setPayload] = useState({
    Category: "",
    IsAsset: false,
    SubCategoryID: 0,
    SubcategoryName: "",
    SearchItemName: "",
    IsExpirable: "No",
    IsActive: "1",
    isCSSDItem: "0",
    isLaundry: "0",
    IsStent: "0",
    SearchbyData: "",
    TypeName: "",
    ItemCode: "",
    ItemCatalog: "",
    Description: "",
    HSNCode: "",
    ManuFacturer: "",
    ManufactureID: 0,
    SaltID: 0,
    rack: 0,
    shelf: 0,
    minlevel: 0,
    maxLevel: 0,
    reorderLevel: 0,
    reorderqty: 0,
    Dose: "",
    packing: "",
    ScheduleType: "",
    MajorUnit: "",
    MinorUnit: "",
    ConversionFactor: "",
    CommodityCode: "",
    GSTType: "",
    CGSTPercent: "",
    SGSTPercent: "",
    DrugCategory: 0,
    IsStockable: "1",
    ItemType: "",
    TaxGroup: "",
    MapGeneric: "0",
    MapGenericList: "",
    ItemGroup: "",
  });
  const handleReactSelect = (name, e) => {
    const { value } = e;
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayload({ ...payload, [name]: type === "checkbox" ? checked : value });
  };
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <ReactSelect
            placeholderName={t("Category")}
            id={"Category"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
            dynamicOptions={""}
            name="Category"
            handleChange={handleReactSelect}
            value={payload?.Category}
          />
          <ReactSelect
            placeholderName={t("SubCategory")}
            id={"SubCategoryID"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
            dynamicOptions={""}
            name="SubCategoryID"
            handleChange={handleReactSelect}
            value={payload?.SubCategoryID}
          />
          <Input
            type="text"
            className="form-control required-fields"
            id="TypeName"
            name="TypeName"
            onChange={handleChange}
            value={payload.TypeName}
            lable={t("ItemName")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ItemCode "
            name="ItemCode"
            onChange={handleChange}
            value={payload.ItemCode}
            lable={t("Item Code")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ItemCatalog "
            name="ItemCatalog"
            onChange={handleChange}
            value={payload.ItemCatalog}
            lable={t(t("Item Catalog No"))}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Description "
            name="Description"
            onChange={handleChange}
            value={payload.Description}
            lable={t("Description")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="HSNCode "
            name="HSNCode"
            onChange={handleChange}
            value={payload.HSNCode}
            lable={t("Item HSN Code")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <ReactSelect
            placeholderName={t("ManuFacturer")}
            id={"ManufactureID"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="ManufactureID"
            handleChange={handleReactSelect}
            value={payload?.ManufactureID}
            requiredClassName="required-fields"
          />

          <Input
            type="text"
            className="form-control"
            id="rack "
            name="rack"
            onChange={handleChange}
            value={payload.rack || ""}
            lable={t("Rack")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="shelf"
            name="shelf"
            onChange={handleChange}
            value={payload.shelf || ""}
            lable={t("Shelf")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="minlevel"
            name="minlevel"
            onChange={handleChange}
            value={payload.minlevel || ""}
            lable={t("MinLevel")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />

          <Input
            type="number"
            className="form-control"
            id="maxLevel"
            name="maxLevel"
            onChange={handleChange}
            value={payload.maxLevel || ""}
            lable={t("MaxLevel")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="reorderLevel"
            name="reorderLevel"
            onChange={handleChange}
            value={payload.reorderLevel || ""}
            lable={t("ReorderLevel")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="reorderqty"
            name="reorderqty"
            onChange={handleChange}
            value={payload.reorderqty || ""}
            lable={t("ReorderQty")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="Dose"
            name="Dose"
            onChange={handleChange}
            value={payload.Dose}
            lable={t("Dose")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="packing"
            name="packing"
            onChange={handleChange}
            value={payload.packing}
            lable={t("Packing")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <ReactSelect
            placeholderName={t("Dangerous Drug")}
            id={"ScheduleType"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={[
              { label: "Select", value: "0" },
              { label: "H1-Schedule Type", value: "1" },
              { label: "H2-Schedule Type", value: "2" },
            ]}
            name="ScheduleType"
            handleChange={handleReactSelect}
            value={payload?.ScheduleType}
          />
          <ReactSelect
            placeholderName={t("Purchase Unit")}
            id={"MajorUnit"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="MajorUnit"
            handleChange={handleReactSelect}
            value={payload?.MajorUnit}
            requiredClassName="required-fields"
          />
          <ReactSelect
            placeholderName={t("Sale Unit")}
            id={"MinorUnit"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="MinorUnit"
            handleChange={handleReactSelect}
            value={payload?.MinorUnit}
            requiredClassName="required-fields"
          />
          <Input
            type="number"
            className="form-control required-fields"
            id="ConversionFactor"
            name="ConversionFactor"
            onChange={handleChange}
            value={payload.ConversionFactor}
            lable={t("Issue Factor")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="CommodityCode"
            name="CommodityCode"
            onChange={handleChange}
            value={payload.CommodityCode}
            lable={t("CommodityCode")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />

          <ReactSelect
            placeholderName={t("GST Type")}
            id={"GSTType"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={[{ label: "Select", value: "1" }]}
            handleChange={handleReactSelect}
            value={payload?.GSTType}
            requiredClassName="required-fields"
          />
          <ReactSelect
            placeholderName={t("Drug Category")}
            id={"DrugCategory"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="DrugCategory"
            handleChange={handleReactSelect}
            value={payload?.DrugCategory}
          />
          <ReactSelect
            placeholderName={t("Stock Type")}
            id={"IsStockable"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={[
              { label: "Stockable", value: "1" },
              { label: "Non-Stockable", value: "0" },
            ]}
            name="IsStockable"
            handleChange={handleReactSelect}
            value={payload?.IsStockable}
          />
          <ReactSelect
            placeholderName={t("ItemType")}
            id={"ItemType"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={[
              { label: "Select", value: "" },
              { label: "Vital", value: "Vital" },
              { label: "Essential", value: "Essential" },
              { label: "Deseriable", value: "Deseriable" },
            ]}
            name="ItemType"
            handleChange={handleReactSelect}
            value={payload?.ItemType}
          />

          <ReactSelect
            placeholderName={t("Expirable")}
            id={"IsExpirable"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="IsExpirable"
            handleChange={handleReactSelect}
            value={payload?.IsExpirable}
          />
          <ReactSelect
            placeholderName={t("Active")}
            id={"IsActive"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="IsActive"
            handleChange={handleReactSelect}
            value={payload?.IsActive}
          />

          <ReactSelect
            placeholderName={t("ItemGroup")}
            id="IsStent"
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="IsStent"
            handleChange={handleReactSelect}
            value={payload.IsStent}
          />

          <ReactSelect
            placeholderName={t("Map Generic")}
            id={"MapGeneric"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="MapGeneric"
            handleChange={handleReactSelect}
            value={payload?.MapGeneric}
          />

          <Input
            type="number"
            className="form-control required-fields"
            id="ExtraSellingCharge"
            name="ExtraSellingCharge"
            onChange={handleChange}
            value={payload.ExtraSellingCharge}
            lable={t("Extra Selling Charge(%)")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />

          <ReactSelect
            placeholderName={t("Pharmacy")}
            id={"Pharmacy"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="Pharmacy"
            handleChange={handleReactSelect}
            value={payload?.Pharmacy}
          />

          <Input
            type="number"
            className="form-control"
            id="PurchaseRate"
            name="PurchaseRate"
            onChange={handleChange}
            value={""}
            lable={t("Purchase Rate")}
            placeholder=""
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <ReactSelect
            placeholderName={t("Trade Name")}
            id={"TradeName"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="TradeName"
            handleChange={handleReactSelect}
            value={payload?.TradeName}
          />

          <ReactSelect
            placeholderName={t("Commudity")}
            id={"Commudity"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
            dynamicOptions={""}
            name="Commudity"
            handleChange={handleReactSelect}
            value={payload?.Commudity}
          />

          <Input
            type="number"
            className="form-control"
            id="MRP"
            name="MRP"
            onChange={handleChange}
            value={payload?.MRP}
            lable={t("MRP")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12 mt-2"
          />
          <button className="btn btn-sm btn-success ml-2 mt-2">Save</button>
        </div>
      </div>
        <div className="card">
        <Heading title={t("Search ItemName List")} />

        <div className="row p-2">
          <ReactSelect
            placeholderName={t("Category")}
            id={"Category"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
            dynamicOptions={""}
            name="Category"
            handleChange={handleChange}
            value={payload?.Category}
            requiredClassName="required-fields"
          />
          <ReactSelect
            placeholderName={t("SubCategory")}
            id={"SubCategoryID"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
            dynamicOptions={""}
            name="SubCategoryID"
            handleChange={handleReactSelect}
            value={payload?.SubCategoryID}
            // requiredClassName="required-fields"
          />
          <Input
            type="text"
            className="form-control required-fields"
            id="SearchItemName "
            name="SearchItemName"
            onChange={handleChange}
            value={payload.SearchItemName}
            lable={t("Search By Name/Code")}
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
          />
          <ReactSelect
            placeholderName={t("Search Type")}
            id={"SearchbyData"}
            searchable={true}
            removeIsClearable={true}
            respclass="col-xl-2 col-md-3 col-sm-6 col-12"
            dynamicOptions={[
              { label: "Search by First Name", value: "FirstName" },
              { label: "Search by Word", value: "Word" },
              { label: "Search by Item Code", value: "ItemCode" },
            ]}
            name="SearchbyData"
            handleChange={handleReactSelect}
            value={payload?.SearchbyData}
            requiredClassName="required-fields"
          />
         <button className="btn btn-sm btn-success ml-3">Search</button>
        </div>
      </div>
    </>
  );
};
export default ItemMaster;
