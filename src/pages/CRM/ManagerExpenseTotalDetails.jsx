import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import Tables from "../../components/UI/customTable";
import Heading from "../../components/UI/Heading";

const ManagerExpenseTotalDetails = ({ visible }) => {
  console.log("visible", visible);
  const [hotelData, setHotelData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [travelData, setTravelData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [othersData, setOthersData] = useState([]);
  const [loading, setLoading] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetExpenseReportWithTravelDetails, {
        ExpenseReportId: Number(visible?.showData),
      })
      .then((res) => {
        console.log("kamal", res.data.data);
        if (res.data.success === true) {
          setHotelData(res.data.data.dthotel);
          setMealsData(res.data.data.dtMeals);
          setTravelData(res.data.data.dtTravel);
          setEntertainmentData(res.data.data.dtEntertainment);
          setOthersData(res.data.data.dtMisc);
          setLoading(false);
        } else {
          toast.error("No record found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const travelTHEAD = [
    "S.No.",
    "TravelBy",
    "From",
    "To",
    "Amount",
    "Description",
  ];
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      {(hotelData?.Hotel_Amount ?? 0) > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Hotel Details</span>}
            secondTitle={
              <span className="font-weight-bold mr-3">
                Total Amount :&nbsp;{" "}
                {Number(hotelData?.Hotel_Amount ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            }
          />
          <table
            className="table table-bordered table-sm "
            style={{ fontWeight: "", width: "" }}
          >
            <tbody>
              <tr>
                <td>HOTEL NAME: &nbsp; &nbsp; &nbsp; &nbsp;</td>
                <td>{hotelData?.HotelName}</td>
              </tr>
              <tr>
                <td>HOTEL AMOUNT:</td>
                <td>{hotelData?.Hotel_Amount}</td>
              </tr>
              <tr>
                <td>DESCRIPTION:</td>
                <td>{hotelData?.Hotel_description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {(othersData?.misc_Expense ?? 0) > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Others Details</span>}
            secondTitle={
              <span className="font-weight-bold mr-3">
                Total Amount :&nbsp;{" "}
                {Number(othersData?.misc_Expense ?? 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            }
          />
          <table
            className="table table-bordered table-sm "
            style={{ fontWeight: "", width: "" }}
          >
            <tbody>
              <tr>
                <td>Other Amount:</td>
                <td>{othersData?.misc_Expense}</td>
              </tr>

              <tr>
                <td>Other Description:</td>
                <td>{othersData?.Description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {(entertainmentData?.entertainment_Expense ?? 0) > 0 && (
        <div className="card mt-1">
          <Heading
            title={
              <span className="font-weight-bold">Entertainment Details</span>
            }
            secondTitle={
              <span className="font-weight-bold mr-3">
                Total Amount :&nbsp;{" "}
                {Number(
                  entertainmentData?.entertainment_Expense ?? 0
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            }
          />
          <table
            className="table table-bordered table-sm "
            style={{ fontWeight: "", width: "" }}
          >
            <tbody>
              <tr>
                <td>Entertainment Amount:</td>
                <td>{entertainmentData?.entertainment_Expense}</td>
              </tr>

              <tr>
                <td>Entertainment Description:</td>
                <td>{entertainmentData?.EntermentDescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {((mealsData?.BreakfastAmounnt ?? 0) > 0 ||
        (mealsData?.LunchAmounnt ?? 0) > 0 ||
        (mealsData?.DinnerAmounnt ?? 0) > 0) && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Meals Details</span>}
            secondTitle={
              <span className="font-weight-bold mr-3">
                Total Amount :&nbsp;{" "}
                {Number(
                  Number(mealsData?.BreakfastAmounnt ?? 0) +
                    Number(mealsData?.LunchAmounnt ?? 0) +
                    Number(mealsData?.DinnerAmounnt ?? 0)
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            }
          />
          <table
            className="table table-bordered table-sm "
            style={{ fontWeight: "bold", width: "" }}
          >
            <tbody>
              <tr>
                <td>Breakfast Amount:</td>
                <td>{mealsData?.BreakfastAmounnt}</td>
              </tr>
              <tr>
                <td>Lunch Amount:</td>
                <td>{mealsData?.LunchAmounnt}</td>
              </tr>
              <tr>
                <td>Dinner Amount:</td>
                <td>{mealsData?.DinnerAmounnt}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{mealsData?.MealsDescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {travelData?.length > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Travel Details</span>}
            secondTitle={
              <span className="font-weight-bold mr-3">
                Total Amount :&nbsp;{" "}
                {Number(
                  travelData?.reduce(
                    (sum, item) => sum + Number(item.traveling_amount ?? 0),
                    0
                  ) ?? 0
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            }
          />
          <Tables
            thead={travelTHEAD}
            tbody={travelData?.map((ele, index) => ({
              "S.No.": index + 1,
              TravelBy: ele?.traveling_by,
              From: ele?.tavling_from,
              To: ele?.tavling_to,
              Amount: ele?.traveling_amount,
              Description: ele?.traveling_description,
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      )}
      <div className="row">
        <div className="ml-auto font-weight-bold">
          <span className="font-weight-bold">Total Amount: &nbsp;</span>
          <span className="mr-4">
            {(
              Number(hotelData?.Hotel_Amount ?? 0) +
              Number(othersData?.misc_Expense ?? 0) +
              Number(entertainmentData?.entertainment_Expense ?? 0) +
              Number(mealsData?.BreakfastAmounnt ?? 0) +
              Number(mealsData?.LunchAmounnt ?? 0) +
              Number(mealsData?.DinnerAmounnt ?? 0) +
              Number(
                travelData?.reduce(
                  (sum, item) => sum + Number(item.traveling_amount ?? 0),
                  0
                ) ?? 0
              )
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default ManagerExpenseTotalDetails;
