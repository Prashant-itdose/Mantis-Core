export const apiUrls = {
  ///////////////////////////////    MANTIS API  ///////////////////////////////

  login: "/CRMCOREAPI/api/Login",
  ProjectSelect: "/CRMCOREAPI/api/MasterBind/ProjectSelect",

  ///ViewIssuesSearchPage
  ViewIssueSearch: "/CRMCOREAPI/API/ViewIssue/ViewIssueSearch",

  //MyView Page Api's
  AutobackupSearch: "/CRMCOREAPI/API/Autobackup/AutobackupSearch",
  AssingedToMe: "/CRMCOREAPI/API/MyView/AssingedToMe",
  UnAssigned: "/CRMCOREAPI/API/MyView/UnAssigned",
  ReportedbyMe: "/CRMCOREAPI/API/MyView/ReportedbyMe",

  // ViewIssues Page Api's
  ApplyAction: "/CRMCOREAPI/API/ViewIssue/ApplyAction",
  Vertical_Select: "/CRMCOREAPI/api/MasterBind/Vertical_Select",
  Team_Select: "/CRMCOREAPI/api/MasterBind/Team_Select",
  Wing_Select: "/CRMCOREAPI/api/MasterBind/Wing_Select",
  POC_1_Select: "/CRMCOREAPI/api/MasterBind/POC_1_Select",
  POC_2_Select: "/CRMCOREAPI/api/MasterBind/POC_2_Select",
  POC_3_Select: "/CRMCOREAPI/api/MasterBind/POC_3_Select",
  Category_Select: "/CRMCOREAPI/API/MasterBind/Category_Select",
  Status_Select: "/CRMCOREAPI/api/MasterBind/StatusSelect",
  Reporter_Select: "/CRMCOREAPI/api/MasterBind/Reporter_Select",
  AssignTo_Select: "/CRMCOREAPI/API/MasterBind/AssignTo_Select",
  Priority_Select: "/CRMCOREAPI/API/MasterBind/Priority_Select",
  DeleteTicket: "/CRMCOREAPI/API/ViewIssue/DeleteTicket",
  ViewTicket: "/CRMCOREAPI/API/ViewIssue/ViewTicket",
  UpdateTicket: "/CRMCOREAPI/API/BugReport/UpdateTicket",
  DeleteNote: "/CRMCOREAPI/API/BugReport/DeleteNote",
  UpdateNote: "/CRMCOREAPI/API/BugReport/UpdateNote",
  ViewNote: "/CRMCOREAPI/API/ViewIssue/ViewNote",
  ViewHistory: "/CRMCOREAPI/API/ViewIssue/ViewHistory",
  UpdateTickets: "/CRMCOREAPI/API/ViewIssue/UpdateTicket",
  //NewTicket(ReportIssue) Page Api's
  NewTicket: "/CRMCOREAPI/API/BugReport/NewTicket",

  //AutoBackupStatusSheet  Page Api's   & MisReport Table Page
  AutobackupSearch: "/CRMCOREAPI/API/Autobackup/AutobackupSearch",
  SPOC_Update: "/CRMCOREAPI/API/Autobackup/SPOC_Update",
  AutobackupLog: "/CRMCOREAPI/API/Autobackup/AutobackupLog",

  //Employee Master Page Api's   && SearchEmployeeMaster
  SearchEmployee_EmployeeID:"/CRMCOREAPI/API/EmployeeMaster/SearchEmployee_EmployeeID",
  CreateEmployee: "/CRMCOREAPI/API/EmployeeMaster/CreateEmployee",
  UpdateEmployee: "/CRMCOREAPI/API/EmployeeMaster/UpdateEmployee",
  ViewDesignation: "/CRMCOREAPI/API/DesignationMaster/ViewDesignation",
  Accesslevel: "/CRMCOREAPI/API/EmployeeMaster/Accesslevel",
  SearchEmployee_Name: "/CRMCOREAPI/API/EmployeeMaster/SearchEmployee_Name",
  CreateDesignation: "/CRMCOREAPI/API/DesignationMaster/CreateDesignation",
  UpdateDesignation: "/CRMCOREAPI/API/DesignationMaster/UpdateDesignation",

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
  DeleteClientMachineList: "/CRMCOREAPI/API/ProjectMaster/DeleteClientMachineList",
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
    "/CRMCOREAPI/api/EmployeeMaster/UserVsProjectRemove",
  SelectProjectOrdering: "/CRMCOREAPI/api/ProjectMaster/SelectProjectOrdering",
  UpdateProjectOrdering: "/CRMCOREAPI/api/ProjectMaster/UpdateProjectOrdering",

  //ChangeSubmitDateofTicket Page Api's
  ChangeSubmitDate: "/CRMCOREAPI/api/BugReport/ChangeSubmitDate",

  //UploadDocument Page Api's
  DocumentType_Select: "/CRMCOREAPI/api/ManageDocument/DocumentType_Select",
  UploadDocument_Search: "/CRMCOREAPI/api/ManageDocument/UploadDocument_Search",
  UploadDocument: "/CRMCOREAPI/api/ManageDocument/UploadDocument",

  //Amount Submission Page Api's
  AmountSubmission_ByAccounts:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts",
  AmountSubmission_ByAccounts_Search:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts_Search",
  AmountSubmission_ByAccounts_IsCancel:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts_IsCancel",

  //Query Master Api;s
  Query_Insert: "/CRMCOREAPI/api/QueryVsResult/Query_Insert",
  Query_Update: "/CRMCOREAPI/API/QueryVsResult/Query_Update",
  QueryVsResult_Select: "/CRMCOREAPI/api/QueryVsResult/QueryVsResultSelect",
  Result_Insert: "/CRMCOREAPI/API/QueryVsResult/Result_Insert",
  Result_Update: "/CRMCOREAPI/API/QueryVsResult/Result_Update",

  //Connector Request Api's
  Connector_Search: "/CRMCOREAPI/API/AccountsConnector/Connector_Search",
  Connector_Settlement_Insert:
    "/CRMCOREAPI/API/AccountsConnector/Connector_Settlement_Insert",
  Connector_Discount_Insert:
    "/CRMCOREAPI/API/AccountsConnector/Connector_Discount_Insert",
  Connector_Select: "/CRMCOREAPI/API/AccountsConnector/Connector_Select",
  Connector_Insert: "/CRMCOREAPI/API/AccountsConnector/Connector_Insert",
  Connector_Status_Update:
    "/CRMCOREAPI/API/AccountsConnector/Connector_Status_Update",
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
  Attendence_Login: "/CRMCOREAPI/API/CRMAttendence/Attendence_Login",
  Attendence_Select: "/CRMCOREAPI/api/CRMAttendance/AttendanceSelect",
  Attendence_Search: "/CRMCOREAPI/api/CRMAttendance/AttendanceSearch",
  Birthday_Anniversary_Search:
    "/CRMCOREAPI/API/CRMAttendence/Birthday_Anniversary_Search",

  //LeaveRequest//
  LeaveRequest_ApproveALL: "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_ApproveALL",
  LeaveRequest_BindCalender:
    "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_BindCalender",
  LeaveRequest_Save: "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_Save",
  LeaveRequest_Select: "/CRMCOREAPI/API/CRMAttendence/LeaveRequest_Select",

  LeaveApproval_Search: "/CRMCOREAPI/API/CRMAttendence/LeaveApproval_Search",
  ShowWorkingDays_Search: "/CRMCOREAPI/API/CRMAttendence/ShowWorkingDays_Search",
  UploadAttendanceExcel: "/CRMCOREAPI/API/CRMAttendence/UploadAttendanceExcel",

  ////Advance Request /////
  AdvanceAmount_Requset: "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmount_Requset",
  AdvanceRequest_Search: "/CRMCOREAPI/API/AdvanceAmount/AdvanceRequest_Search",
  AdvaceAmount_Select: "/CRMCOREAPI/API/AdvanceAmount/AdvaceAmount_Select",
  AdvanceAmount_Status_Update:
    "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmount_Status_Update",
  AdvanceAmount_Paid: "/CRMCOREAPI/API/AdvanceAmount/AdvanceAmount_Paid",
  ManageExpense_Insert: "/CRMCOREAPI/API/ManageExpense/ManageExpense_Insert",
  IsExpenseExists: "/CRMCOREAPI/API/ManageExpense/IsExpenseExists",
  GetReportingTo_Employee: "/CRMCOREAPI/API/ManageExpense/GetReportingTo_Employee",
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
  DotNetMantis_EmployeeID: "/CRMCOREAPI/API/EmployeeMaster/DotNetMantis_EmployeeID",
  UserVsRole_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsRole_Select",
  UserVsCategory_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsCategory_Select",

  Monthly_CollectionSheet_MIS:
    "/CRMCOREAPI/API/Accounts/Monthly_CollectionSheet_MIS",
  UpdateFlag: "/CRMCOREAPI/API/EmployeeMaster/UpdateFlag",
  GetFlag: "/CRMCOREAPI/API/EmployeeMaster/GetFlag",
  AmountSubmission_ByAccounts_Update:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts_Update",
  Payement_Installment_Select:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payement_Installment_Select",
  Payment_Installment_Insert:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Insert",
  Payment_Installment_Search:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Search",
  BulkNewTicket: "/CRMCOREAPI/API/BugReport/BulkNewTicket",
  Settlement_Select: "/CRMCOREAPI/API/Accounts/Settlement_Select",
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
  LedgerStatus: "/CRMCOREAPI/API/Accounts/LedgerStatus",
  LedgerStatus_LockUnLock: "/CRMCOREAPI/API/Accounts/LedgerStatus_LockUnLock",
  LedgerStatus_LockUnLock_Log:
    "/CRMCOREAPI/API/Accounts/LedgerStatus_LockUnLock_Log",
  Settlement: "/CRMCOREAPI/API/Accounts/Settlement",
  Settlement_IsCancel: "/CRMCOREAPI/API/Accounts/Settlement_IsCancel",
  CreateEmployee_Short: "/CRMCOREAPI/API/EmployeeMaster/CreateEmployee_Short",
  UserVsVertical_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsVertical_Select",
  UserVsVerticalMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsVerticalMapping",
  UserVsTeam_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsTeam_Select",
  UserVsTeamMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsTeamMapping",
  UserVsWing_Select: "/CRMCOREAPI/API/EmployeeMaster/UserVsWing_Select",
  UserVsWingMapping: "/CRMCOREAPI/API/EmployeeMaster/UserVsWingMapping",
  UpdateThemeColor: "/CRMCOREAPI/API/EmployeeMaster/UpdateThemeColor",
  GetUserName: "/CRMCOREAPI/api/ProjectMaster/GetUserName",
  AmountSub_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/AmountSub_CancelReason_Select",
  AmountSubmission_ByAccounts_Search_ProjectID:
    "/CRMCOREAPI/API/Accounts/AmountSubmission_ByAccounts_Search_ProjectID",
  SalesBooking_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/SalesBooking_CancelReason_Select",
  SalesBooking_IsCancel:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_IsCancel",
  SalesBooking_GeneratePI:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_GeneratePI",
  SalesBooking_Load_SalesID:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_Load_SalesID",

  Quotation_Search: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Search",
  Quotation_Select: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Select",
  Quotation_Insert: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Insert",
  Quotation_IsCancel: "/CRMCOREAPI/API/AccountsQuotation/Quotation_IsCancel",
  Quotation_Approved: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Approved",
  Quotation_Load_QuotationID:
    "/CRMCOREAPI/API/AccountsQuotation/Quotation_Load_QuotationID",
  Quotation_SalesConvert:
    "/CRMCOREAPI/API/AccountsQuotation/Quotation_SalesConvert",
  Quotation_Update: "/CRMCOREAPI/API/AccountsQuotation/Quotation_Update",
  Quotation_CancelReason_Select:
    "/CRMCOREAPI/API/MasterBind/Quotation_CancelReason_Select",
  Payment_Installment_Update:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/Payment_Installment_Update",
  Sales_MIS_Type: "/CRMCOREAPI/api/MasterBind/Sales_MIS_Type",
  BillingCompany_Select: "/CRMCOREAPI/API/ProjectMaster/BillingCompany_Select",
  SaveFilterData: "/CRMCOREAPI/API/ViewIssue/SaveFilterData",
  SearchFilterData: "/CRMCOREAPI/API/ViewIssue/SearchFilterData",
  MantisSummary_Search: "/CRMCOREAPI/api/MantisSummary/MantisSummarySearch",
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
  Circular_Read: "/CRMCOREAPI/API/Circular/Circular_Read",
  PaymentTerms_Select: "/CRMCOREAPI/API/MasterBind/PaymentTerms_Select",
  SalesBooking_Load_SalesID:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/SalesBooking_Load_SalesID",
  BillingCompanyDetail_Select_ID:
    "/CRMCOREAPI/API/MasterBind/BillingCompanyDetail_Select_ID",
  Dev_Caledar: "/CRMCOREAPI/API/MantisSummary/DeveloperCalender",
  Module_Select: "/CRMCOREAPI/API/MasterBind/Module_Select",
  Pages_Select: "/CRMCOREAPI/API/MasterBind/Pages_Select",
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
  TaxInvoice_Search: "/CRMCOREAPI/API/AccountsTaxInvoice/TaxInvoice_Search",
  TaxInvoice_Upload: "/CRMCOREAPI/API/AccountsTaxInvoice/TaxInvoice_Upload",
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
  Reason_Select: "/CRMCOREAPI/API/MasterBind/Reason_Select",
  GetProjectInfo: "/CRMCOREAPI/API/ProjectMaster/GetProjectInfo",
  ProjectMasterUpdate: "/CRMCOREAPI/api/ProjectMasterUpdate/SaveProject",
  getViewProject: "/CRMCOREAPI/API/ProjectMasterUpdate/ViewProject",
  ShowImpleStepsMaster_select:
    "/CRMCOREAPI/api/EmployeeMaster/UserVsProject_Select",
  ImplementationTracker_Insert: "/CRMCOREAPI/API/ImplementationSteps/Step_Remark",
  ImplementationSteps_Insert_details:
    "/CRMCOREAPI/API/ImplementationSteps/ImplementationSteps_Insert_details",
  Step_Remark_Select: "/CRMCOREAPI/API/ImplementationSteps/Step_Remark_Select",
  ApproveClick: "/CRMCOREAPI/API/ImplementationSteps/ApproveClick",
  Birthday_Anniversary_Interface_Search:
    "/api/CRMAttendance/BirthdayAnniversarySearch",
  ViewDocument: "/CRMCOREAPI/API/ManageDocument/UploadDocument",
  ViewAttachment: "/CRMCOREAPI/API/ViewIssue/ViewAttachment",
  InsertAttachment: "/CRMCOREAPI/API/BugReport/InsertAttachment",
  DeleteAttachment: "/CRMCOREAPI/API/BugReport/DeleteAttachment",
  ViewIssueSearchClient: "/CRMCOREAPI/API/ViewIssue/ViewIssueSearchClient",
  ApplyActionClient: "/CRMCOREAPI/API/ViewIssue/ApplyActionClient",
  InsertNoteLog: "/CRMCOREAPI/API/BugReport/InsertNoteLog",
  UpdateEmployee_Short: "/CRMCOREAPI/API/EmployeeMaster/UpdateEmployee_Short",
  CoorDashboard_Received_Recovery:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Received_Recovery",
  CoorDashboard_NewSales:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_NewSales",
  CoorDashboard_Open_Dead_Sales:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Open_Dead_Sales",
  CoorDashboard_Ageing_Sheet_Pending_Recovery:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Ageing_Sheet_Pending_Recovery",
  CentreRemoveProject: "/CRMCOREAPI/API/ProjectMasterUpdate/CentreRemoveProject",
  BulkNoteInsert: "/CRMCOREAPI/API/BugReport/BulkNoteInsert",
  CreateEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/CreateEmployeeModule",
  GetEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/GetEmployeeModule",
  DeleteEmployeeModule: "/CRMCOREAPI/API/EmployeeMaster/DeleteEmployeeModule",
  UpdateStatusCopy: "/CRMCOREAPI/API/ManageExpense/UpdateStatusCopy",
  ExpenceDetails: "/CRMCOREAPI/API/ManageExpense/ExpenceDetails",
  AMC_Payment_Installment_Insert:
    "/CRMCOREAPI/API/AccountsPaymentInstallment/AMC_Payment_Installment_Insert",
  CoorDashboard_Paid_Request_Status:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Paid_Request_Status",
  CoorDashboard_Developer_Availability:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Developer_Availability",
  CoorDashboard_Ticket_Close_Assign:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Ticket_Close_Assign",
  CoorDashboard_Financial_Recovery_Quotation:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Financial_Recovery_Quotation",
  CoorDashboard_Top_Client_Amount:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Top_Client_Amount",
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
  TSAAggrementSearch: "/CRMCOREAPI/API/TSAAgreement/TSAAggrementSearch",
  TSACancel: "/CRMCOREAPI/API/TSAAgreement/TSACancel",
  ConfirmTSA: "/CRMCOREAPI/API/TSAAgreement/ConfirmTSA",
  TSAHold: "/CRMCOREAPI/API/TSAAgreement/TSAHold",
  TSAAgreementVarification: "/CRMCOREAPI/API/TSAAgreement/TSAAgreementVarification",
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
  ClientFeedbackTransaction: "/CRMCOREAPI/API/Feedback/ClientFeedbackTransaction",
  ProjectVsAMCMapping: "/CRMCOREAPI/API/ProjectMasterUpdate/ProjectVsAMCMapping",
  ManagerDashboard_Recovery_Quarter:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Recovery_Quarter",
  ManagerDashboard_Ageing_POC:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Ageing_POC",
  ManagerDashboard_Total_Pending:
    "/CRMCOREAPI/API/ManagerDashboard/ManagerDashboard_Total_Pending",
  CoorDashboard_Total_Pending:
    "/CRMCOREAPI/API/CoordinatorDashboard/CoorDashboard_Total_Pending",
  CreateSalesLead: "/CRMCOREAPI/API/SalesLead/CreateSalesLead",
  DeadSalesLead: "/CRMCOREAPI/API/SalesLead/DeadSalesLead",
  ConvertedSalesLead: "/CRMCOREAPI/API/SalesLead/ConvertedSalesLead",
  SearchSalesLeads: "/CRMCOREAPI/API/SalesLead/SearchSalesLeads",
  UploadEmployeeSignature: "/CRMCOREAPI/API/EmployeeMaster/UploadEmployeeSignature",
  ResendEmail: "/CRMCOREAPI/API/SalesLead/ResendEmail",
  EditSalesLead: "/CRMCOREAPI/API/SalesLead/EditSalesLead",
  UpdateSalesLead: "/CRMCOREAPI/API/SalesLead/UpdateSalesLead",
  Lead_Email_Log: "/CRMCOREAPI/API/SalesLead/Lead_Email_Log",
  Tsa_Agreement_Format: "/CRMCOREAPI/API/TSAAgreement/Tsa_Agreement_Format",
  Change_Tsa_Agreement_Format:
    "/CRMCOREAPI/API/TSAAgreement/Change_Tsa_Agreement_Format",
  CreateFeedback: "/CRMCOREAPI/API/Feedback/CreateFeedback",
  ResendFeedbackMail: "/CRMCOREAPI/API/Feedback/ResendFeedbackMail",
  AllEmployeeSearch: "/CRMCOREAPI/API/SalesLead/AllEmployeeSearch",
  CreateEmployeeFeedback: "/CRMCOREAPI/API/EmployeeFeedback/CreateEmployeeFeedback",
  ResendFeedbackWhatsapp: "/CRMCOREAPI/API/Feedback/ResendFeedbackWhatsapp",
  EmployeeFeedbackSearch: "/CRMCOREAPI/API/EmployeeFeedback/EmployeeFeedbackSearch",
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
  GetEmployeeTransactions: "/CRMCOREAPI/API/Attendence/GetEmployeeTransactions",
  EmployeeBind: "/CRMCOREAPI/API/Attendence/EmployeeBind",
  WeaklyMonthlyBreakCount: "/CRMCOREAPI/API/Attendence/WeaklyMonthlyBreakCount",
  WeaklyMonthlyBreakHours: "/CRMCOREAPI/API/Attendence/WeaklyMonthlyBreakHours",
  EmployeeFeedbackDashboard: "/CRMCOREAPI/API/Attendence/EmployeeFeedbackDashboard",
  ClientFeedbackDashboard: "/CRMCOREAPI/API/Attendence/ClientFeedbackDashboard",
  EmailerSearch: "/CRMCOREAPI/API/Emailer/EmailerSearch",
  RepushMail: "/CRMCOREAPI/API/Emailer/RepushMail",
  GetFlagProject: "/CRMCOREAPI/API/ProjectMasterUpdate/GetFlagProject",
  UpdateFlagProject: "/CRMCOREAPI/API/ProjectMasterUpdate/UpdateFlagProject",
  EmployeeEmail: "/CRMCOREAPI/API/Emailer/EmployeeEmail",
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
    "/CRMCOREAPI/API/CRMAttendence/ForceFullyShortBreakAttendanceSave",
  ForceFullyShortBreakAttendanceSearch:
    "/CRMCOREAPI/API/CRMAttendence/ForceFullyShortBreakAttendanceSearch",
  Old_Mantis_Sub_Team_Select:
    "/CRMCOREAPI/API/MasterBind/Old_Mantis_Sub_Team_Select",
  Old_Mantis_Team_Select:
    "/CRMCOREAPI/API/MasterBind/Old_Mantis_Team_Select",
  Attendence_Report:
    "/CRMCOREAPI/API/CRMAttendence/Attendence_Report",
  MonthWiseAttendanceReoprt:
    "/CRMCOREAPI/API/CRMAttendence/MonthWiseAttendanceReoprt",
  AttendanceReoprtTypeWise:
    "/CRMCOREAPI/API/CRMAttendence/AttendanceReoprtTypeWise",
  WOandOLTypeWise:
    "/CRMCOREAPI/API/CRMAttendence/WOandOLTypeWise",
  SaveFilterTableReprintData:
    "/CRMCOREAPI/api/DynamicFilter/SaveFilterTableReprintData",
  GetFilterTableReprintData:
    "/CRMCOREAPI/api/DynamicFilter/GetFilterTableReprintData",
  GetFeaturesStatus:
    "/CRMCOREAPI/API/Circular/GetFeaturesStatus",
  Reporter_Select_Employee:
    "/CRMCOREAPI/API/MasterBind/Reporter_Select_Employee",
};
