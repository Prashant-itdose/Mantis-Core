export const apiUrls = {
  ///////////////////////////////    MANTIS API  ///////////////////////////////

  login: "/CRMCOREAPI/api/Login",
  ProjectSelect: "/CRMCOREAPI/api/MasterBind/ProjectSelect",

  ///ViewIssuesSearchPage
  ViewIssueSearch: "/CRMCOREAPI/API/ViewIssue/ViewIssueSearch",

  //MyView Page Api's
  AutobackupSearch: "/CRMCOREAPI/API/Autobackup/AutobackupSearch",
  AssingedToMe: "/CRMCOREAPI/API/MyView/AssignedToMe",
  UnAssigned: "/CRMCOREAPI/API/MyView/UnAssigned",
  ReportedbyMe: "/CRMCOREAPI/API/MyView/ReportedbyMe",

  // ViewIssues Page Api's
  ApplyAction: "/CRMCOREAPI/API/ViewIssue/ApplyAction",
  Vertical_Select: "/CRMCOREAPI/API/MasterBind/Vertical_Select",
  Team_Select: "/CRMCOREAPI/api/MasterBind/Team_Select",
  Wing_Select: "/CRMCOREAPI/API/MasterBind/Wing_Select",
  POC_1_Select: "/CRMCOREAPI/API/MasterBind/POC_1_Select",
  POC_2_Select: "/CRMCOREAPI/API/MasterBind/POC_2_Select",
  POC_3_Select: "/CRMCOREAPI/API/MasterBind/POC_3_Select",
  Category_Select: "/CRMCOREAPI/api/MasterBind/Category_Select",
  Status_Select: "/CRMCOREAPI/api/MasterBind/StatusSelect",
  Reporter_Select: "/CRMCOREAPI/API/MasterBind/Reporter_Select",
  AssignTo_Select: "/CRMCOREAPI/api/MasterBind/AssignToSelect",
  Priority_Select: "/CRMCOREAPI/api/MasterBind/Priority_Select",
  DeleteTicket: "/CRMCOREAPI/API/ViewIssue/DeleteTicket",
  ViewTicket: "/CRMCOREAPI/api/ViewIssue/ViewTicket",
  UpdateTicket: "/CRMCOREAPI/api/BugReport/UpdateTicket",
  DeleteNote: "/CRMCOREAPI/api/BugReport/DeleteNote",
  UpdateNote: "/CRMCOREAPI/api/BugReport/UpdateNote",
  ViewNote: "/CRMCOREAPI/api/ViewIssue/ViewNote",
  ViewHistory: "/CRMCOREAPI/api/ViewIssue/ViewHistory",
  UpdateTickets: "/CRMCOREAPI/API/ViewIssue/UpdateTicket",
  //NewTicket(ReportIssue) Page Api's
  NewTicket: "/CRMCOREAPI/API/BugReport/NewTicket",

  //AutoBackupStatusSheet  Page Api's   & MisReport Table Page
  SPOC_Update: "/CRMCOREAPI/API/Autobackup/SPOCUpdate",
  AutobackupLog: "/CRMCOREAPI/API/Autobackup/AutobackupLog",

  //Employee Master Page Api's   && SearchEmployeeMaster
  SearchEmployee_EmployeeID:
    "/CRMCOREAPI/API/EmployeeMaster/SearchEmployee_EmployeeID",
  CreateEmployee: "/CRMCOREAPI/API/EmployeeMaster/CreateEmployee",
  UpdateEmployee: "/CRMCOREAPI/API/EmployeeMaster/UpdateEmployee",
  ViewDesignation: "/CRMCOREAPI/api/Designation/ViewDesignation",
  Accesslevel: "/CRMCOREAPI/API/EmployeeMaster/Accesslevel",
  SearchEmployee_Name: "/CRMCOREAPI/api/EmployeeMaster/SearchEmployee_Name",
  CreateDesignation: "/CRMCOREAPI/API/Designation/CreateDesignation",
  UpdateDesignation: "/CRMCOREAPI/api/Designation/UpdateDesignation",

  //EmployeeChangePassword Page Api's
  ChangePassword: "/CRMCOREAPI/api/BugReport/ChangePassword",

  //ProjectMaster Page Api's
  CreateProject: "/CRMCOREAPI/API/ProjectMaster/CreateProject",
  ViewProject: "/CRMCOREAPI/API/ProjectMaster/ViewProject",
  UpdateProject: "/CRMCOREAPI/API/ProjectMaster/UpdateProject",
  UpdateProjectRateCard: "/CRMCOREAPI/API/ProjectMaster/UpdateProjectRateCard",
  GetCountry: "/CRMCOREAPI/API/MasterBind/GetCountry",
  GetState: "/CRMCOREAPI/API/MasterBind/GetState",
  GetDistrict: "/CRMCOREAPI/API/MasterBind/GetDistrict",
  GetCity: "/CRMCOREAPI/API/MasterBind/GetCity",
  GetProductVersion: "/CRMCOREAPI/api/ProjectMaster/GetProductVersion",
  UpdateLocality: "/CRMCOREAPI/API/ProjectMaster/UpdateLocality",
  CreateBilling: "/CRMCOREAPI/API/ProjectMaster/CreateBilling",
  UpdateBilling: "/CRMCOREAPI/API/ProjectMaster/UpdateBilling",
  UpdateEscalation: "/CRMCOREAPI/API/ProjectMaster/UpdateEscalation",
  UpdateNotification: "/CRMCOREAPI/API/ProjectMaster/UpdateNotification",
  GetClientModuleList: "/CRMCOREAPI/api/ProjectMaster/GetClientModuleList",
  GetPhaseID: "/CRMCOREAPI/API/ProjectMaster/GetPhaseID",
  CreateClientModule: "/CRMCOREAPI/API/ProjectMaster/CreateClientModule",
  UpdateClientModule: "/CRMCOREAPI/API/ProjectMaster/UpdateClientModule",
  DeleteClientModule: "/CRMCOREAPI/API/ProjectMaster/DeleteClientModule",
  SaveMachineList: "/CRMCOREAPI/API/ProjectMaster/SaveMachineList",
  UpdateMachineList: "/CRMCOREAPI/API/ProjectMaster/UpdateMachineList",
  DeleteClientMachineList:
    "/CRMCOREAPI/API/ProjectMaster/DeleteClientMachineList",
  GetGstTaxAndOldLisID: "/CRMCOREAPI/API/ProjectMaster/GetGstTaxAndOldLisID",
  AMCType_Select: "/CRMCOREAPI/API/MasterBind/AMCType_Select",
  UpdateFinancialInfo: "/CRMCOREAPI/API/ProjectMaster/UpdateFinancialInfo",
  CreateClientCentre: "/CRMCOREAPI/API/ProjectMaster/CreateClientCentre",
  UpdateClientCentre: "/CRMCOREAPI/API/ProjectMaster/UpdateClientCentre",
  GetProjectCategory: "/CRMCOREAPI/API/ProjectMaster/GetProjectCategory",
  CreateProjectCategory: "/CRMCOREAPI/API/ProjectMaster/CreateProjectCategory",

  //UserVSProjectMapping Page Api's
  UserVsProject_Select: "/CRMCOREAPI/api/EmployeeMaster/UserVsProject_Select",
  UserVsProjectMapping: "/CRMCOREAPI/api/EmployeeMaster/UserVsProjectMapping",
  Remove_UserVsProjectMapping:
    "/CRMCOREAPI/API/EmployeeMaster/UserVsProjectRemove",
  SelectProjectOrdering: "/CRMCOREAPI/API/ProjectMaster/SelectProjectOrdering",
  UpdateProjectOrdering: "/CRMCOREAPI/API/ProjectMaster/UpdateProjectOrdering",

  //ChangeSubmitDateofTicket Page Api's
  ChangeSubmitDate: "/CRMCOREAPI/api/BugReport/ChangeSubmitDate",

  //UploadDocument Page Api's
  DocumentType_Select: "/CRMCOREAPI/api/ManageDocument/DocumentType_Select",
  UploadDocument_Search: "/CRMCOREAPI/api/ManageDocument/UploadDocument_Search",
  UploadDocument: "/CRMCOREAPI/api/ManageDocument/UploadDocument",

  //Amount Submission Page Api's
  AmountSubmission_ByAccounts:
    "/CRMCOREAPI/API/Accounts/AmountSubmissionByAccounts",
  AmountSubmission_ByAccounts_Search:
    "/CRMCOREAPI/API/Accounts/AmountSubmissionByAccountsSearch",
  AmountSubmission_ByAccounts_IsCancel:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts_IsCancel",

  //Query Master Api;s
  Query_Insert: "/CRMCOREAPI/api/QueryVsResult/Query_Insert",
  Query_Update: "/CRMCOREAPI/API/QueryVsResult/Query_Update",
  QueryVsResult_Select: "/CRMCOREAPI/api/QueryVsResult/QueryVsResultSelect",
  Result_Insert: "/CRMCOREAPI/api/QueryVsResult/Result_Insert",
  Result_Update: "/CRMCOREAPI/api/QueryVsResult/Result_Update",

  //Connector Request Api's
  Connector_Search: "/CRMCOREAPI/API/AccountsConnector/ConnectorSearch",
  Connector_Settlement_Insert:
    "/CRMCOREAPI/api/AccountsConnector/ConnectorSettlementInsert",
  Connector_Discount_Insert:
    "/CRMCOREAPI/api/AccountsConnector/ConnectorDiscountInsert",
  Connector_Select: "/CRMCOREAPI/api/AccountsConnector/ConnectorSelect",
  Connector_Insert: "/CRMCOREAPI/API/AccountsConnector/ConnectorInsert",
  Connector_Status_Update:
    "/CRMCOREAPI/api/AccountsConnector/ConnectorStatusUpdate",
  Connector_Update: "/CRMCOREAPI/API/AccountsConnector/Connector_Update",

  GetImplementaiondropdown:
    "/CRMCOREAPI/api/ImplementationSteps/ImplementationSteps_MasterSelect",
  InsertImplementaion:
    "/CRMCOREAPI/api/ImplementationSteps/ImplementationSteps_Insert",
  DeleteImplementation:
    "/CRMCOREAPI/api/ImplementationSteps/ImplementationSteps_Delete",
  UpdateImplementation:
    "/CRMCOREAPI/api/ImplementationSteps/ImplementationSteps_Update",

  //Attendance//
  Attendence_Login: "/CRMCOREAPI/api/CRMAttendance/AttendanceLogin",
  Attendence_Select: "/CRMCOREAPI/api/CRMAttendance/AttendanceSelect",
  Attendence_Search: "/CRMCOREAPI/api/CRMAttendance/AttendanceSearch",
  Birthday_Anniversary_Search:
    "/CRMCOREAPI/API/CRMAttendence/Birthday_Anniversary_Search",

  //LeaveRequest//
  LeaveRequest_ApproveALL:
    "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_ApproveALL",
  LeaveRequest_BindCalender:
    "/CRMCOREAPI/api/CRMAttendance/LeaveRequest_BindCalender",
  LeaveRequest_Save: "/CRMCOREAPI/api/CRMAttendance/LeaveRequest_Save",
  LeaveRequest_Select: "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_Select",

  LeaveApproval_Search: "/CRMCOREAPI/api/CRMAttendance/LeaveApproval_Search",
  ShowWorkingDays_Search:
    "/CRMCOREAPI/API/CRMAttendence/ShowWorkingDays_Search",
  UploadAttendanceExcel: "/CRMCOREAPI/API/CRMAttendence/UploadAttendanceExcel",

  ////Advance Request /////
  AdvanceAmount_Requset: "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmountRequest",
  AdvanceRequest_Search: "/CRMCOREAPI/API/AdvanceAmount/AdvanceRequestSearch",
  AdvaceAmount_Select: "/CRMCOREAPI/API/AdvanceAmount/AdvaceAmount_Select",
  AdvanceAmount_Status_Update:
    "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmount_Status_Update",
  AdvanceAmount_Paid: "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmount_Paid",
  ManageExpense_Insert: "/CRMCOREAPI/API/ManageExpense/ManageExpenseInsert",
  IsExpenseExists: "/CRMCOREAPI/API/ManageExpense/IsExpenseExists",
  GetReportingTo_Employee:
    "/CRMCOREAPI/API/ManageExpense/GetReportingToEmployee",
  ViewExpenseList: "/CRMCOREAPI/API/ManageExpense/ViewExpenseList",
  PaidAmount: "/CRMCOREAPI/API/ManageExpense/PaidAmount",
  ViewExpenseList_Accounts:
    "/CRMCOREAPI/API/ManageExpense/ViewExpenseList_Accounts",
  UpdateStatus: "/CRMCOREAPI/API/ManageExpense/UpdateStatus",

  // Access right
  CreateRole: "/CRMCOREAPI/API/AccessRight/CreateRole",
  SearchRole: "/CRMCOREAPI/api/AccessRight/SearchRole",
  UpdateRole: "/CRMCOREAPI/API/AccessRight/UpdateRole",
  EmployeeView: "/CRMCOREAPI/API/AccessRight/EmployeeView",

  CreateMenu: "/CRMCOREAPI/API/AccessRight/CreateMenu",
  UpdateMenu: "/CRMCOREAPI/API/AccessRight/UpdateMenu",
  SearchMenu: "/CRMCOREAPI/api/AccessRight/SearchMenu",

  BindRoleVsMenu_File: "/CRMCOREAPI/api/AccessRight/BindRoleVsMenu_File",

  CreateFile: "/CRMCOREAPI/API/AccessRight/CreateFile",
  SearchFile: "/CRMCOREAPI/API/AccessRight/SearchFile",
  UpdateFile: "/CRMCOREAPI/API/AccessRight/UpdateFile",
  AccessRight_Bind: "/CRMCOREAPI/api/AccessRight/AccessRight_Bind",
  AccessRight_Update: "/CRMCOREAPI/api/AccessRight/AccessRight_Insert",
  UserVsRoleMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsRoleMapping",
  UserVsCategoryMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsCategoryMapping",
  DotNetMantis_EmployeeID:
    "/CRMCOREAPI/API/EmployeeMaster/DotNetMantis_EmployeeID",
  UserVsRole_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsRole_Select",
  UserVsCategory_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsCategory_Select",

  Monthly_CollectionSheet_MIS:
    "/CRMCOREAPI/api/Accounts/Monthly_CollectionSheet_MIS",
  UpdateFlag: "/CRMCOREAPI/API/EmployeeMaster/UpdateFlag",
  GetFlag: "/CRMCOREAPI/API/EmployeeMaster/GetFlag",
  AmountSubmission_ByAccounts_Update:
    "/CRMCOREAPI/API/Accounts/AmountSubmissionUpdate",
  Payement_Installment_Select:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payement_Installment_Select",
  Payment_Installment_Insert:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Insert",
  Payment_Installment_Search:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Search",
  BulkNewTicket: "/CRMCOREAPI/API/BugReport/BulkNewTicket",
  Settlement_Select: "/CRMCOREAPI/API/Accounts/SettlementSelect",
  UpdateProfile: "/CRMCOREAPI/API/EmployeeMaster/UpdateProfile",
  // ForgetPassword_ValdiateEmailMobile:'/CRMCOREAPI/API/EmployeeMaster/ForgetPassword_ValdiateEmailMobile',
  ForgetPassword_ValdiateEmailMobile:
    "/CRMCOREAPI/API/LoginAPIDynamic/ForgetPassword_ValdiateEmailMobile",
  // ForgetPassword_ValdiateOTP:'/CRMCOREAPI/API/EmployeeMaster/ForgetPassword_ValdiateOTP',
  ForgetPassword_ValdiateOTP:
    "/CRMCOREAPI/API/LoginAPIDynamic/ForgetPassword_ValdiateOTP",
  // ForgetPassword_ChangePassword:'/CRMCOREAPI/API/EmployeeMaster/ForgetPassword_ChangePassword',
  ForgetPassword_ChangePassword:
    "/CRMCOREAPI/API/LoginAPIDynamic/ForgetPassword_ChangePassword",
  LedgerStatus: "/CRMCOREAPI/API/Accounts/LedgerStatusFromForm",
  LedgerStatus_LockUnLock: "/CRMCOREAPI/API/Accounts/LedgerStatusLockUnLock",
  LedgerStatus_LockUnLock_Log:
    "/CRMCOREAPI/API/Accounts/LedgerStatusLockUnLockLog",
  Settlement: "/CRMCOREAPI/API/Accounts/Settlement",
  Settlement_IsCancel: "/CRMCOREAPI/API/Accounts/Settlement_IsCancel",
  CreateEmployee_Short: "/CRMCOREAPI/api/EmployeeMaster/CreateEmployee_Short",
  UserVsVertical_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsVerticalSelect",
  UserVsVerticalMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsVerticalMapping",
  UserVsTeam_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsTeamSelect",
  UserVsTeamMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsTeamMapping",
  UserVsWing_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsWingSelect",
  UserVsWingMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsWingMapping",
  UpdateThemeColor: "/CRMCOREAPI/API/EmployeeMaster/UpdateThemeColor",
  GetUserName: "/CRMCOREAPI/api/ProjectMaster/GetUserName",
  AmountSub_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/AmountSub_CancelReason_Select",
  AmountSubmission_ByAccounts_Search_ProjectID:
    "/CRMCOREAPI/API/Accounts/AmountSubmissionByAccountsSearch",
  SalesBooking_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/SalesBooking_CancelReason_Select",
  SalesBooking_IsCancel:
    "/CRMCOREAPI/api/AccountsPaymentInstallment/SalesBooking_IsCancel",
  SalesBooking_GeneratePI:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_GeneratePI",
  SalesBooking_Load_SalesID:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_Load_SalesID",

  Quotation_Search: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Search",
  Quotation_Select: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Select",
  Quotation_Insert: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Insert",
  Quotation_IsCancel: "/CRMCOREAPI/api/AccountsQuotation/Quotation_IsCancel",
  Quotation_Approved: "/CRMCOREAPI/API/AccountsQuotation/QuotationApproved",
  Quotation_Load_QuotationID:
    "/CRMCOREAPI/API/AccountsQuotation/Quotation_Load_QuotationID",
  Quotation_SalesConvert:
    "/CRMCOREAPI/API/AccountsQuotation/Quotation_SalesConvert",
  Quotation_Update: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Update",
  Quotation_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/Quotation_CancelReason_Select",
  Payment_Installment_Update:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Update",
  Sales_MIS_Type: "/CRMCOREAPI/API/MasterBind/Sales_MIS_Type",
  BillingCompany_Select: "/CRMCOREAPI/API/ProjectMaster/BillingCompanySelect",
  SaveFilterData: "/CRMCOREAPI/API/ViewIssue/SaveFilterData",
  SearchFilterData: "/CRMCOREAPI/API/ViewIssue/SearchFilterData",
  MantisSummary_Search: "/CRMCOREAPI/API/MantisSummary/MantisSummarySearch",
  SaveFilterDataSubmission: "/CRMCOREAPI/API/MasterBind/SaveFilterData ",
  SearchFilterDataSubmission: "/CRMCOREAPI/API/MasterBind/SearchFilterData ",
  SalesSaveFilterData: "/CRMCOREAPI/API/MasterBind/SaveFilterData",
  SalesSearchFilterData: "/CRMCOREAPI/API/MasterBind/SearchFilterData ",

  ///Dashboard Api///////////
  DevDashboard_Summary: "/CRMCOREAPI/api/MantisSummary/DevDashboardSummary",
  DevDashboard_Detailed: "/CRMCOREAPI/API/MantisSummary/DevDashboard_Detailed",
  Circular_News: "/CRMCOREAPI/api/Circular/CircularNews",
  Circular_UserList: "/CRMCOREAPI/api/Circular/UserList",
  Circular_Search: "/CRMCOREAPI/api/Circular/Circular_Search",
  SaveCircular: "/CRMCOREAPI/api/Circular/SaveCircular",
  Circular_Read: "/CRMCOREAPI/API/Circular/CircularRead",
  PaymentTerms_Select: "/CRMCOREAPI/API/MasterBind/PaymentTerms_Select",
  SalesBooking_Load_SalesID:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_Load_SalesID",
  BillingCompanyDetail_Select_ID:
    "/CRMCOREAPI/API/MasterBind/BillingCompanyDetail_Select_ID",
  Dev_Caledar: "/CRMCOREAPI/API/MantisSummary/GetCalendar",
  Module_Select: "/CRMCOREAPI/api/MasterBind/Module_Select",
  Pages_Select: "/CRMCOREAPI/api/MasterBind/Pages_Select",
  CreateModule: "/CRMCOREAPI/API/MasterBind/CreateModule",
  CreatePages: "/CRMCOREAPI/API/MasterBind/CreatePages",
  UpdatePages: "/CRMCOREAPI/API/MasterBind/UpdatePages",
  UpdateModule: "/CRMCOREAPI/API/MasterBind/UpdateModule",
  Quotation_PaymentTerms_Select:
    "/CRMCOREAPI/API/AccountsQuotation/Quotation_PaymentTerms_Select",
  PI_Load_QuotationID: "/CRMCOREAPI/API/AccountsQuotation/PI_Load_QuotationID",

  Quotation_Email_Log: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Email_Log",
  Quotation_Email: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Email",
  SalesBooking_GenerateTax:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_GenerateTax",
  TaxInvoice_Search: "/CRMCOREAPI/API/AccountsTaxInvoice/TaxInvoiceSearch",
  TaxInvoice_Upload: "/CRMCOREAPI/API/AccountsTaxInvoice/TaxInvoiceUpload",
  DevDashboard_Welcome_PriorityID:
    "/CRMCOREAPI/API/MantisSummary/DevDashboardWelcomePriority",
  DevDashboard_Welcome_Category:
    "/CRMCOREAPI/API/MantisSummary/DevDashboardWelcomeCategory",
  DevDashboard_Welcome_AvgTime_Category:
    "/CRMCOREAPI/API/MantisSummary/DevDashboardWelcomeAvgTimeCategory",
  DevDashboard_Welcome_Status_Count:
    "/CRMCOREAPI/API/MantisSummary/DevDashboardWelcomeStatusCount",
  TrainingVedio: "/CRMCOREAPI/api/TrainingVideo/TrainingVideo",
  PaymentFollowup: "/CRMCOREAPI/API/Accounts/PaymentFollowup",
  ManageGlobalMaster: "/CRMCOREAPI/API/MasterBind/ManageGlobalMaster",
  GetTeamMember: "/CRMCOREAPI/api/MasterBind/GetTeamMember",
  Reason_Select: "/CRMCOREAPI/api/MasterBind/Reason_Select",
  GetProjectInfo: "/CRMCOREAPI/API/ProjectMaster/GetProjectInfo",
  ProjectMasterUpdate: "/CRMCOREAPI/api/ProjectMasterUpdate/SaveProject",
  getViewProject: "/CRMCOREAPI/API/ProjectMasterUpdate/ViewProject",
  ShowImpleStepsMaster_select:
    "/CRMCOREAPI/API/ImplementationSteps/StepDetail_Project_Select",
  ImplementationTracker_Insert:
    "/CRMCOREAPI/API/ImplementationSteps/Step_Remark",
  ImplementationSteps_Insert_details:
    "/CRMCOREAPI/API/ImplementationSteps/ImplementationSteps_Insert_details",
  Step_Remark_Select: "/CRMCOREAPI/API/ImplementationSteps/Step_Remark_Select",
  ApproveClick: "/CRMCOREAPI/API/ImplementationSteps/ApproveClick",
  Birthday_Anniversary_Interface_Search:
    "/CRMCOREAPI/API/CRMAttendance/BirthdayAnniversarySearch",
  ViewDocument: "/CRMCOREAPI/API/ManageDocument/UploadDocument",
  ViewAttachment: "/CRMCOREAPI/API/ViewIssue/ViewAttachment",
  InsertAttachment: "/CRMCOREAPI/API/BugReport/InsertAttachment",
  DeleteAttachment: "/CRMCOREAPI/API/BugReport/DeleteAttachment",
  ViewIssueSearchClient: "/CRMCOREAPI/API/ViewIssue/ViewIssueSearchClient",
  ApplyActionClient: "/CRMCOREAPI/API/ViewIssue/ApplyActionClient",
  InsertNoteLog: "/CRMCOREAPI/API/BugReport/InsertNoteLog",
  UpdateEmployee_Short: "/CRMCOREAPI/api/EmployeeMaster/UpdateEmployee_Short",
  CoorDashboard_Received_Recovery:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardReceivedRecovery",
  CoorDashboard_NewSales:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardNewSales",
  CoorDashboard_Open_Dead_Sales:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardOpenDeadSales",
  CoorDashboard_Ageing_Sheet_Pending_Recovery:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardAgeingSheetPendingRecovery",
  CentreRemoveProject:
    "/CRMCOREAPI/API/ProjectMasterUpdate/CentreRemoveProject",
  BulkNoteInsert: "/CRMCOREAPI/API/BugReport/BulkNoteInsert",
  CreateEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/CreateEmployeeModule",
  GetEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/GetEmployeeModule",
  DeleteEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/DeleteEmployeeModule",
  UpdateStatusCopy: "/CRMCOREAPI/API/ManageExpense/UpdateStatusCopy",
  ExpenceDetails: "/CRMCOREAPI/API/ManageExpense/ExpenseDetails",
  AMC_Payment_Installment_Insert:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/AMC_Payment_Installment_Insert",
  CoorDashboard_Paid_Request_Status:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardPaidRequestStatus",
  CoorDashboard_Developer_Availability:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardDeveloperAvailability",
  CoorDashboard_Ticket_Close_Assign:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardTicketCloseAssign",
  CoorDashboard_Financial_Recovery_Quotation:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardFinancialRecoveryQuotation",
  CoorDashboard_Top_Client_Amount:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardTopClientAmount",
  CoorDashboard_Current_Month_Bifurcation:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Current_Month_Bifurcation",
  CoorDashboard_Quotation_Month:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Quotation_Month",
  ManagerDashboard_Ticket_Category_Analysis:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Ticket_Category_Analysis",
  ManagerDashboard_New_Quarter_Sales:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_New_Quarter_Sales",
  ManagerDashboard_Paid_Request_Status:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Paid_Request_Status",
  // TSAAggrementSearch: "/CRMCOREAPI/API/TSAAgreement/TSAAggrementSearch",
  TSAAggrementSearch: "/CRMCOREAPI/API/TSAAgreement/TSAAgreementSearch",
  TSACancel: "/CRMCOREAPI/API/TSAAgreement/TSACancel",
  ConfirmTSA: "/CRMCOREAPI/API/TSAAgreement/ConfirmTSA",
  TSAHold: "/CRMCOREAPI/API/TSAAgreement/TSAHold",
  TSAAgreementVarification:
    "/CRMCOREAPI/API/TSAAgreement/TSAAgreementVarification",
  ManagerDashboard_New_Sales:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_New_Sales",
  ManagerDashboard_Received_Recovery:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Received_Recovery",
  ManagerDashboard_Top_Client_Amount:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Top_Client_Amount",
  CreateTechnicalSupportAgreement:
    "/CRMCOREAPI/API/TSAAgreement/CreateTechnicalSupportAgreement",
  ManagerDashboard_Delay_Recovery:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Delay_Recovery",
  TSAMarque: "/CRMCOREAPI/API/TSAAgreement/TSAMarque",
  ClientFeedbackSearch: "/CRMCOREAPI/API/Feedback/ClientFeedbackSearch",
  ClientFeedbackTransaction:
    "/CRMCOREAPI/API/Feedback/ClientFeedbackTransaction",
  ProjectVsAMCMapping:
    "/CRMCOREAPI/API/ProjectMasterUpdate/ProjectVsAMCMapping",
  ManagerDashboard_Recovery_Quarter:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Recovery_Quarter",
  ManagerDashboard_Ageing_POC:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Ageing_POC",
  ManagerDashboard_Total_Pending:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Total_Pending",
  CoorDashboard_Total_Pending:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboardTotalDonePending",
  CreateSalesLead: "/CRMCOREAPI/API/SalesLead/CreateSalesLead",
  DeadSalesLead: "/CRMCOREAPI/API/SalesLead/DeadSalesLead",
  ConvertedSalesLead: "/CRMCOREAPI/API/SalesLead/ConvertedSalesLead",
  SearchSalesLeads: "/CRMCOREAPI/API/SalesLead/SearchSalesLeads",
  UploadEmployeeSignature:
    "/CRMCOREAPI/API/EmployeeMaster/UploadEmployeeSignature",
  ResendEmail: "/CRMCOREAPI/API/SalesLead/ResendEmail",
  EditSalesLead: "/CRMCOREAPI/API/SalesLead/EditSalesLead",
  UpdateSalesLead: "/CRMCOREAPI/API/SalesLead/UpdateSalesLead",
  Lead_Email_Log: "/CRMCOREAPI/API/SalesLead/Lead_Email_Log",
  // Tsa_Agreement_Format: "/CRMCOREAPI/API/TSAAgreement/Tsa_Agreement_Format",
  Tsa_Agreement_Format: "/CRMCOREAPI/API/TSAAgreement/GetTsaAgreementFormat",
  Change_Tsa_Agreement_Format:
    "/CRMCOREAPI/API/TSAAgreement/Change_Tsa_Agreement_Format",
  CreateFeedback: "/CRMCOREAPI/API/Feedback/CreateFeedback",
  ResendFeedbackMail: "/CRMCOREAPI/API/Feedback/ResendFeedbackMail",
  AllEmployeeSearch: "/CRMCOREAPI/API/SalesLead/AllEmployeeSearch",
  CreateEmployeeFeedback:
    "/CRMCOREAPI/API/EmployeeFeedback/CreateEmployeeFeedback",
  ResendFeedbackWhatsapp: "/CRMCOREAPI/API/Feedback/ResendFeedbackWhatsapp",
  EmployeeFeedbackSearch:
    "/CRMCOREAPI/API/EmployeeFeedback/EmployeeFeedbackSearch",
  ShowFullFeedback: "/CRMCOREAPI/API/EmployeeFeedback/ShowFullFeedback",
  ShowAverageRating: "/CRMCOREAPI/API/EmployeeFeedback/ShowAverageRating",
  EmployeeFeebackBind: "/CRMCOREAPI/API/EmployeeFeedback/EmployeeFeebackBind",
  EmployeeFeedbackTransaction:
    "/CRMCOREAPI/API/EmployeeFeedback/EmployeeFeedbackTransaction",
  ResendEmployeeFeedbackWhatsapp:
    "/CRMCOREAPI/API/EmployeeFeedback/ResendEmployeeFeedbackWhatsapp",
  ResendEmployeeFeedbackMail:
    "CRMAPI/API/EmployeeFeedback/ResendEmployeeFeedbackMail",
  EmployeeFeedbackAvg: "/CRMCOREAPI/api/EmployeeFeedback/EmployeeFeedbackAvg",
  GetWorkingHours: "/CRMCOREAPI/api/CRMAttendance/GetWorkingHours",
  GetEmployeeTransactions:
    "/CRMCOREAPI/API/CRMAttendance/GetEmployeeTransactions",
  EmployeeBind: "/CRMCOREAPI/API/CRMAttendance/EmployeeBind",
  WeaklyMonthlyBreakCount:
    "/CRMCOREAPI/API/CRMAttendance/WeaklyMonthlyBreakCount",
  WeaklyMonthlyBreakHours:
    "/CRMCOREAPI/API/CRMAttendance/WeaklyMonthlyBreakHours",
  EmployeeFeedbackDashboard:
    "/CRMCOREAPI/API/Attendence/EmployeeFeedbackDashboard",
  ClientFeedbackDashboard: "/CRMCOREAPI/API/CRMAttendance/ClientFeedbackDashboard",
  EmailerSearch: "/CRMCOREAPI/API/Email/EmailerSearch",
  RepushMail: "/CRMCOREAPI/API/Email/RepushMail",
  GetFlagProject: "/CRMCOREAPI/API/ProjectMasterUpdate/GetFlagProject",
  UpdateFlagProject: "/CRMCOREAPI/API/ProjectMasterUpdate/UpdateFlagProject",
  EmployeeEmail: "/CRMCOREAPI/API/Email/EmployeeEmail",
  SendTaxInvoiceMailFinal:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SendTaxInvoiceMailFinal",
  TaxInvoiceLog: "/CRMCOREAPI/API/AccountsTaxInvoice/TaxInvoiceLog",
  MorningWishSave: "/CRMCOREAPI/api/MorningWish/MorningWishSave",
  MorningWishSearch: "/CRMCOREAPI/API/MorningWish/MorningWishSearch",
  RemoveMorningWish: "/CRMCOREAPI/API/MorningWish/RemoveMorningWish",
  UpdateMorningWish: "/CRMCOREAPI/API/MorningWish/UpdateMorningWish",
  EditMorningWish: "/CRMCOREAPI/API/MorningWish/EditMorningWish",
  UploadEmployeeImages: "/CRMCOREAPI/API/EmployeeMaster/UploadEmployeeImages",
  RemoveEmployeeImages: "/CRMCOREAPI/API/EmployeeMaster/RemoveEmployeeImages",
  SearchEmployeeImages: "/CRMCOREAPI/API/EmployeeMaster/SearchEmployeeImages",
  ForceFullyShortBreakAttendanceSave:
    "/CRMCOREAPI/API/CRMAttendance/ForceFullyShortBreakAttendanceSave",
  ForceFullyShortBreakAttendanceSearch:
    "/CRMCOREAPI/API/CRMAttendance/ForceFullyShortBreakAttendanceSearch",
  Old_Mantis_Sub_Team_Select:
    "/CRMCOREAPI/API/MasterBind/Old_Mantis_Sub_Team_Select",
  Old_Mantis_Team_Select: "/CRMCOREAPI/API/MasterBind/Old_Mantis_Team_Select",
  Attendence_Report: "/CRMCOREAPI/API/CRMAttendence/Attendence_Report",
  MonthWiseAttendanceReoprt:
    "/CRMCOREAPI/API/CRMAttendence/MonthWiseAttendanceReoprt",
  AttendanceReoprtTypeWise:
    "/CRMCOREAPI/api/CRMAttendance/AttendanceReportTypeWise",
  WOandOLTypeWise: "/CRMCOREAPI/api/CRMAttendance/WOandOLTypeWise",
  SaveFilterTableReprintData:
    "/CRMCOREAPI/api/DynamicFilter/SaveFilterTableReprintData",
  GetFilterTableReprintData:
    "/CRMCOREAPI/API/DynamicFilter/GetFilterTableReprintData",
  GetFeaturesStatus: "/CRMCOREAPI/API/Circular/GetFeaturesStatus",
  Reporter_Select_Employee:
    "/CRMCOREAPI/API/MasterBind/Reporter_Select_Employee",
};
