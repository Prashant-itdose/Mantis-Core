export const apiUrls = {
  login: "/Login",

  ProjectSelect: "/MasterBind/ProjectSelect",
  ViewIssueSearch: "/ViewIssue/ViewIssueSearch",

  //MyView Page Api's
  AutobackupSearch: "/Autobackup/AutobackupSearch",
  AssingedToMe: "/MyView/AssignedToMe",
  UnAssigned: "/MyView/UnAssigned",
  ReportedbyMe: "/MyView/ReportedbyMe",

  // ViewIssues Page Api's
  ApplyAction: "/ViewIssue/ApplyAction",
  Vertical_Select: "/MasterBind/Vertical_Select",
  Team_Select: "/MasterBind/Team_Select",
  Wing_Select: "/MasterBind/Wing_Select",
  POC_1_Select: "/MasterBind/POC_1_Select",
  POC_2_Select: "/MasterBind/POC_2_Select",
  POC_3_Select: "/MasterBind/POC_3_Select",
  Category_Select: "/MasterBind/Category_Select",
  Status_Select: "/MasterBind/StatusSelect",
  Reporter_Select: "/MasterBind/Reporter_Select",
  AssignTo_Select: "/MasterBind/AssignToSelect",
  Priority_Select: "/MasterBind/Priority_Select",
  DeleteTicket: "/ViewIssue/DeleteTicket",
  ViewTicket: "/ViewIssue/ViewTicket",
  UpdateTicket: "/BugReport/UpdateTicket",
  DeleteNote: "/BugReport/DeleteNote",
  UpdateNote: "/BugReport/UpdateNote",
  ViewNote: "/ViewIssue/ViewNote",
  ViewHistory: "/ViewIssue/ViewHistory",
  UpdateTickets: "/ViewIssue/UpdateTicket",
  //NewTicket(ReportIssue) Page Api's
  NewTicket: "/BugReport/NewTicket",
  ManageOverseasTravelInsert: "/ManageOverseas/ManageOverseasTravelInsert",
  SearchOverseasTravel: "/ManageOverseas/SearchOverseasTravel",
  ApproveOrRejectOverseasTravel:
    "/ManageOverseas/ApproveOrRejectOverseasTravel",

  //AutoBackupStatusSheet  Page Api's   & MisReport Table Page
  SPOC_Update: "/Autobackup/SPOCUpdate",
  AutobackupLog: "/Autobackup/AutobackupLog",
  GetOverseasInvoiceList: "/ManageExpense/GetOverseasInvoiceList",
  GetEmailByProjectId: "/Accounts/GetEmailByProjectId",

  //Employee Master Page Api's   && SearchEmployeeMaster
  SearchEmployee_EmployeeID: "/EmployeeMaster/SearchEmployee_EmployeeID",
  CreateEmployee: "/EmployeeMaster/CreateEmployee",
  UpdateEmployee: "/EmployeeMaster/UpdateEmployee",
  ViewDesignation: "/Designation/ViewDesignation",
  Accesslevel: "/EmployeeMaster/Accesslevel",
  SearchEmployee_Name: "/EmployeeMaster/SearchEmployee_Name",
  CreateDesignation: "/Designation/CreateDesignation",
  UpdateDesignation: "/Designation/UpdateDesignation",
  CreateManhourEntry: "/ViewIssue/CreateManhourEntry",
  //EmployeeChangePassword Page Api's
  ChangePassword: "/BugReport/ChangePassword",
  GetKanbanViewList: "/ViewIssue/GetKanbanViewList",
  Reporter_Select_Module_Wise: "/MasterBind/Reporter_Select_Module_Wise",
  Product_Select_Project_Wise: "/MasterBind/Product_Select_Project_Wise",
  Module_Select_Product_Wise: "/MasterBind/Module_Select_Product_Wise",
  Product_Select_Module_Wise: "/MasterBind/Product_Select_Module_Wise",

  //ProjectMaster Page Api's
  CreateProject: "/ProjectMaster/CreateProject",
  ViewProject: "/ProjectMaster/ViewProject",
  UpdateProject: "/ProjectMaster/UpdateProject",
  UpdateProjectRateCard: "/ProjectMaster/UpdateProjectRateCard",
  GetCountry: "/MasterBind/GetCountry",
  GetState: "/MasterBind/GetState",
  GetDistrict: "/MasterBind/GetDistrict",
  GetCity: "/MasterBind/GetCity",
  GetProductVersion: "/ProjectMaster/GetProductVersion",
  UpdateLocality: "/ProjectMaster/UpdateLocality",
  CreateBilling: "/ProjectMaster/CreateBilling",
  UpdateBilling: "/ProjectMaster/UpdateBilling",
  UpdateEscalation: "/ProjectMaster/UpdateEscalation",
  UpdateNotification: "/ProjectMaster/UpdateNotification",
  GetClientModuleList: "/ProjectMaster/GetClientModuleList",
  GetPhaseID: "/ProjectMaster/GetPhaseID",
  CreateClientModule: "/ProjectMaster/CreateClientModule",
  UpdateClientModule: "/ProjectMaster/UpdateClientModule",
  DeleteClientModule: "/ProjectMaster/DeleteClientModule",
  SaveMachineList: "/ProjectMaster/SaveMachineList",
  UpdateMachineList: "/ProjectMaster/UpdateMachineList",
  DeleteClientMachineList: "/ProjectMaster/DeleteClientMachineList",
  GetGstTaxAndOldLisID: "/ProjectMaster/GetGstTaxAndOldLisID",
  AMCType_Select: "/MasterBind/AMCType_Select",
  UpdateFinancialInfo: "/ProjectMaster/UpdateFinancialInfo",
  CreateClientCentre: "/ProjectMaster/CreateClientCentre",
  UpdateClientCentre: "/ProjectMaster/UpdateClientCentre",
  GetProjectCategory: "/ProjectMaster/GetProjectCategory",
  CreateProjectCategory: "/ProjectMaster/CreateProjectCategory",

  //UserVSProjectMapping Page Api's
  UserVsProject_Select: "/EmployeeMaster/UserVsProject_Select",
  UserVsProjectMapping: "/EmployeeMaster/UserVsProjectMapping",
  Remove_UserVsProjectMapping: "/EmployeeMaster/UserVsProjectRemove",
  SelectProjectOrdering: "/ProjectMaster/SelectProjectOrdering",
  UpdateProjectOrdering: "/ProjectMaster/UpdateProjectOrdering",

  //ChangeSubmitDateofTicket Page Api's
  ChangeSubmitDate: "/BugReport/ChangeSubmitDate",

  //UploadDocument Page Api's
  DocumentType_Select: "/ManageDocument/DocumentType_Select",
  UploadDocument_Search: "/ManageDocument/UploadDocument_Search",
  UploadDocument: "/ManageDocument/UploadDocument",
  AmountSubmissionPrintOutPrintOut: "/Reports/AmountSubmissionPrintOutPrintOut",
  SearchDollarExpense: "/ManageExpense/SearchDollarExpense",
  OverseasInvoiceInsert: "/ManageExpense/OverseasInvoiceInsert",

  //Amount Submission Page Api's
  AmountSubmission_ByAccounts: "/Accounts/AmountSubmissionByAccounts",
  AmountSubmission_ByAccounts_Search:
    "/Accounts/AmountSubmissionByAccountsSearch",
  AmountSubmission_ByAccounts_IsCancel:
    "/Accounts/AmountSubmissionByAccountsIsCancel",
  OverseasExcelInsert: "/ManageExpense/OverseasExcelInsert",
  SearchAllEmployees: "/EmployeeMaster/SearchAllEmployees",
  GetProfileDesignation: "/MasterBind/GetProfileDesignation",

  //Query Master Api;s
  Query_Insert: "/QueryVsResult/Query_Insert",
  Query_Update: "/QueryVsResult/Query_Update",
  QueryVsResult_Select: "/QueryVsResult/QueryVsResultSelect",
  Result_Insert: "/QueryVsResult/Result_Insert",
  Result_Update: "/QueryVsResult/Result_Update",

  //Connector Request Api's
  Connector_Search: "/AccountsConnector/ConnectorSearch",
  Connector_Settlement_Insert: "/AccountsConnector/ConnectorSettlementInsert",
  Connector_Discount_Insert: "/AccountsConnector/ConnectorDiscountInsert",
  Connector_Select: "/AccountsConnector/ConnectorSelect",
  Connector_Insert: "/AccountsConnector/ConnectorInsert",
  Connector_Status_Update: "/AccountsConnector/ConnectorStatusUpdate",
  Connector_Update: "/AccountsConnector/ConnectorUpdate",

  GetImplementaiondropdown:
    "/ImplementationSteps/ImplementationSteps_MasterSelect",
  InsertImplementaion: "/ImplementationSteps/ImplementationSteps_Insert",
  DeleteImplementation: "/ImplementationSteps/ImplementationSteps_Delete",
  UpdateImplementation: "/ImplementationSteps/ImplementationSteps_Update",

  //Attendance//
  Attendence_Login: "/CRMAttendance/AttendanceLogin",
  Attendence_Select: "/CRMAttendance/AttendanceSelect",
  Attendence_Search: "/CRMAttendance/AttendanceSearch",
  Birthday_Anniversary_Search: "/CRMAttendence/Birthday_Anniversary_Search",

  //LeaveRequest//
  LeaveRequest_ApproveALL: "/CRMAttendence/LeaveRequest_ApproveALL",
  LeaveRequest_BindCalender: "/CRMAttendance/LeaveRequest_BindCalender",
  LeaveRequest_Save: "/CRMAttendance/LeaveRequest_Save",
  CreateEmployeeTransfer: "/EmployeeMaster/CreateEmployeeTransfer",
  GetEmployeeTransferLogs: "/EmployeeMaster/GetEmployeeTransferLogs",
  LeaveRequest_Select: "/CRMAttendence/LeaveRequest_Select",

  LeaveApproval_Search: "/CRMAttendance/LeaveApproval_Search",
  ShowWorkingDays_Search: "/CRMAttendence/ShowWorkingDays_Search",
  UploadAttendanceExcel: "/CRMAttendence/UploadAttendanceExcel",

  ////Advance Request /////
  AdvanceAmount_Requset: "/AdvanceAmount/AdvanceAmountRequest",
  AdvanceRequest_Search: "/AdvanceAmount/AdvanceRequestSearch",
  AdvaceAmount_Select: "/AdvanceAmount/AdvaceAmount_Select",
  AdvanceAmount_Status_Update: "/AdvanceAmount/AdvanceAmountStatusUpdate",
  AdvanceAmount_Paid: "/AdvanceAmount/AdvanceAmountPaid",
  ManageExpense_Insert: "/ManageExpense/ManageExpenseInsert",
  IsExpenseExists: "/ManageExpense/IsExpenseExists",
  GetReportingTo_Employee: "/ManageExpense/GetReportingToEmployee",
  ViewExpenseList: "/ManageExpense/ViewExpenseList",
  PaidAmount: "/ManageExpense/PaidAmount",
  ViewExpenseList_Accounts: "/ManageExpense/ViewExpenseList_Accounts",
  UpdateStatus: "/ManageExpense/UpdateStatus",
  ExpenseSummary: "/ManageExpense/ExpenseSummary",
  GetManagerMonthlyExpenseSummary:
    "/ManageExpense/GetManagerMonthlyExpenseSummary",
  GetExpenseReportWithTravelDetails:
    "/ManageExpense/GetExpenseReportWithTravelDetails",
  GetEmployeeExpenseCalendar: "/ManageExpense/GetEmployeeExpenseCalendar",
  BulkExpenseApprove: "/ManageExpense/BulkExpenseApprove",
  LeaveRequest_ApproveALL: "/CRMAttendance/LeaveRequest_ApproveALL",

  // Access right
  CreateRole: "/AccessRight/CreateRole",
  QuotationPrintOut: "/Reports/QuotationPrintOut",
  GeneratePIPDF: "/Reports/GeneratePIPDF",
  Sales_Connector_pdf: "/Reports/Sales_Connector_pdf",
  SearchRole: "/AccessRight/SearchRole",
  UpdateRole: "/AccessRight/UpdateRole",
  EmployeeView: "/AccessRight/EmployeeView",

  CreateMenu: "/AccessRight/CreateMenu",
  UpdateMenu: "/AccessRight/UpdateMenu",
  SearchMenu: "/AccessRight/SearchMenu",

  BindRoleVsMenu_File: "/AccessRight/BindRoleVsMenu_File",

  CreateFile: "/AccessRight/CreateFile",
  SearchFile: "/AccessRight/SearchFile",
  UpdateFile: "/AccessRight/UpdateFile",
  AccessRight_Bind: "/AccessRight/AccessRight_Bind",
  AccessRight_Update: "/AccessRight/AccessRight_Insert",
  AccessRight_Insert: "/AccessRight/AccessRight_Insert",
  UserVsRoleMapping: "/EmployeeMaster/UserVsRoleMapping",
  UserVsCategoryMapping: "/EmployeeMaster/UserVsCategoryMapping",
  DotNetMantis_EmployeeID: "/EmployeeMaster/DotNetMantis_EmployeeID",
  UserVsRole_Select: "/EmployeeMaster/UserVsRole_Select",
  UserVsCategory_Select: "/EmployeeMaster/UserVsCategory_Select",

  Monthly_CollectionSheet_MIS: "/Accounts/Monthly_CollectionSheet_MIS",
  UpdateFlag: "/EmployeeMaster/UpdateFlag",
  GetFlag: "/EmployeeMaster/GetFlag",
  AmountSubmission_ByAccounts_Update: "/Accounts/AmountSubmissionUpdate",
  Payement_Installment_Select:
    "/AccountsPaymentInstallment/Payement_Installment_Select",
  Payment_Installment_Insert:
    "/AccountsPaymentInstallment/Payment_Installment_Insert",
  Payment_Installment_Search:
    "/AccountsPaymentInstallment/Payment_Installment_Search",
  BulkNewTicket: "/BugReport/BulkNewTicket",
  Settlement_Select: "/Accounts/SettlementSelect",
  UpdateProfile: "/EmployeeMaster/UpdateProfile",
  SaveSettlement: "/Accounts/SaveSettlement",
  ForgetPassword_ValdiateEmailMobile:
    "/EmployeeMaster/ForgetPassword_ValidateEmailMobile",
  ForgetPassword_ValdiateOTP: "/EmployeeMaster/ForgetPassword_ValidateOTP",
  ForgetPassword_ChangePassword:
    "/EmployeeMaster/ForgetPassword_ChangePassword",
  LedgerStatus: "/Accounts/LedgerStatusFromForm",
  LedgerStatus_LockUnLock: "/Accounts/LedgerStatusLockUnLock",
  LedgerStatus_LockUnLock_Log: "/Accounts/LedgerStatusLockUnLockLog",
  Settlement: "/Accounts/Settlement",
  Settlement_IsCancel: "/Accounts/Settlement_IsCancel",
  CreateEmployee_Short: "/EmployeeMaster/CreateEmployee_Short",
  UserVsVertical_Select: "/EmployeeMaster/UserVsVerticalSelect",
  UserVsVerticalMapping: "/EmployeeMaster/UserVsVerticalMapping",
  UserVsTeam_Select: "/EmployeeMaster/UserVsTeamSelect",
  UserVsTeamMapping: "/EmployeeMaster/UserVsTeamMapping",
  UserVsWing_Select: "/EmployeeMaster/UserVsWingSelect",
  UserVsWingMapping: "/EmployeeMaster/UserVsWingMapping",
  UpdateThemeColor: "/EmployeeMaster/UpdateThemeColor",
  GetUserName: "/ProjectMaster/GetUserName",
  AmountSub_CancelReason_Select: "/MasterBind/AmountSub_CancelReason_Select",
  AmountSubmission_ByAccounts_Search_ProjectID: "/Accounts/SearchByProjectId",
  SalesBooking_CancelReason_Select:
    "/MasterBind/SalesBooking_CancelReason_Select",
  SalesBooking_IsCancel: "/AccountsPaymentInstallment/SalesBooking_IsCancel",
  SalesBooking_GeneratePI:
    "/AccountsPaymentInstallment/SalesBooking_GeneratePI",
  SalesBooking_Load_SalesID:
    "/AccountsPaymentInstallment/SalesBooking_Load_SalesID",

  Quotation_Search: "/AccountsQuotation/Quotation_Search",
  Quotation_Select: "/AccountsQuotation/Quotation_Select",
  Quotation_Insert: "/AccountsQuotation/Quotation_Insert",
  Quotation_IsCancel: "/AccountsQuotation/Quotation_IsCancel",
  Quotation_Approved: "/AccountsQuotation/QuotationApproved",
  Quotation_Load_QuotationID: "/AccountsQuotation/Quotation_Load_QuotationID",
  Quotation_SalesConvert: "/AccountsQuotation/Quotation_SalesConvert",
  Quotation_Update: "/AccountsQuotation/Quotation_Update",
  Quotation_CancelReason_Select: "/MasterBind/Quotation_CancelReason_Select",
  Payment_Installment_Update:
    "/AccountsPaymentInstallment/Payment_Installment_Update",
  Sales_MIS_Type: "/MasterBind/Sales_MIS_Type",
  BillingCompany_Select: "/ProjectMaster/BillingCompanySelect",
  SaveFilterData: "/ViewIssue/SaveFilterData",
  SearchFilterData: "/ViewIssue/SearchFilterData",
  MantisSummary_Search: "/MantisSummary/MantisSummarySearch",
  SaveFilterDataSubmission: "/MasterBind/SaveFilterData ",
  SearchFilterDataSubmission: "/MasterBind/SearchFilterData ",
  SalesSaveFilterData: "/MasterBind/SaveFilterData",
  SalesSearchFilterData: "/MasterBind/SearchFilterData ",

  ///Dashboard Api///////////
  DevDashboard_Summary: "/MantisSummary/DevDashboardSummary",
  DevDashboard_Detailed: "/MantisSummary/DevDashboard_Detailed",
  Circular_News: "/Circular/CircularNews",
  Circular_UserList: "/Circular/UserList",
  Circular_Search: "/Circular/Circular_Search",
  SaveCircular: "/Circular/SaveCircular",
  Circular_Read: "/Circular/CircularRead",
  PaymentTerms_Select: "/MasterBind/PaymentTerms_Select",
  SalesBooking_Load_SalesID:
    "/AccountsPaymentInstallment/SalesBooking_Load_SalesID",
  BillingCompanyDetail_Select_ID: "/MasterBind/BillingCompanyDetail_Select_ID",
  Dev_Caledar: "/MantisSummary/GetCalendar",
  Module_Select: "/MasterBind/Module_Select",
  Pages_Select: "/MasterBind/Pages_Select",
  CreateModule: "/MasterBind/CreateModule",
  UpdateModule: "/MasterBind/UpdateModule",
  CreatePages: "/MasterBind/CreatePages",
  UpdatePages: "/MasterBind/UpdatePages",
  UpdateModule: "/MasterBind/UpdateModule",
  Quotation_PaymentTerms_Select:
    "/AccountsQuotation/Quotation_PaymentTerms_Select",
  PI_Load_QuotationID: "/AccountsQuotation/PI_Load_QuotationID",

  Quotation_Email_Log: "/AccountsQuotation/Quotation_Email_Log",
  Quotation_Email: "/AccountsQuotation/Quotation_Email",
  SalesBooking_GenerateTax:
    "/AccountsPaymentInstallment/SalesBooking_GenerateTax",
  TaxInvoice_Search: "/AccountsTaxInvoice/TaxInvoiceSearch",
  TaxInvoice_Upload: "/AccountsTaxInvoice/TaxInvoiceUpload",
  DevDashboard_Welcome_PriorityID: "/MantisSummary/DevDashboardWelcomePriority",
  DevDashboard_Welcome_Category: "/MantisSummary/DevDashboardWelcomeCategory",
  DevDashboard_Welcome_AvgTime_Category:
    "/MantisSummary/DevDashboardWelcomeAvgTimeCategory",
  DevDashboard_Welcome_Status_Count:
    "/MantisSummary/DevDashboardWelcomeStatusCount",
  TrainingVedio: "/TrainingVideo/TrainingVideo",
  PaymentFollowup: "/Accounts/PaymentFollowup",
  ProjectShiftPdf: "/Reports/ProjectShiftPdf",
  SearchEmployeeTeamData: "/EmployeeMaster/SearchEmployeeTeamData",
  ManageGlobalMaster: "/MasterBind/ManageGlobalMaster",
  GetTeamMember: "/MasterBind/GetTeamMember",
  Reason_Select: "/MasterBind/Reason_Select",
  GetProjectInfo: "/ProjectMaster/GetProjectInfo",
  ProjectMasterUpdate: "/ProjectMasterUpdate/SaveProject",
  getViewProject: "/ProjectMasterUpdate/ViewProject",
  GetProjectDetail: "/ProjectMasterUpdate/GetProjectDetail",
  ShowImpleStepsMaster_select: "/ImplementationSteps/StepDetail_Project_Select",
  ImplementationTracker_Insert: "/ImplementationSteps/Step_Remark",
  ImplementationSteps_Insert_details:
    "/ImplementationSteps/ImplementationSteps_Insert_details",
  Step_Remark_Select: "/ImplementationSteps/Step_Remark_Select",
  ApproveClick: "/ImplementationSteps/ApproveClick",
  Birthday_Anniversary_Interface_Search:
    "/CRMAttendance/BirthdayAnniversarySearch",
  ViewDocument: "/ManageDocument/UploadDocument",
  ViewAttachment: "/ViewIssue/ViewAttachment",
  InsertAttachment: "/BugReport/InsertAttachment",
  DeleteAttachment: "/BugReport/DeleteAttachment",
  ViewIssueSearchClient: "/ViewIssue/ViewIssueSearchClient",
  ApplyActionClient: "/ViewIssue/ApplyActionClient",
  InsertNoteLog: "/BugReport/InsertNoteLog",
  UpdateEmployee_Short: "/EmployeeMaster/UpdateEmployee_Short",
  CoorDashboard_Received_Recovery:
    "/CoordinatorDashboard/CoorDashboardReceivedRecovery",
  CoorDashboard_NewSales: "/CoordinatorDashboard/CoorDashboardNewSales",
  CoorDashboard_Open_Dead_Sales:
    "/CoordinatorDashboard/CoorDashboardOpenDeadSales",
  CoorDashboard_Ageing_Sheet_Pending_Recovery:
    "/CoordinatorDashboard/CoorDashboardAgeingSheetPendingRecovery",
  CentreRemoveProject: "/ProjectMasterUpdate/CentreRemoveProject",
  Module_Search: "/MasterBind/Module_Search",
  BulkNoteInsert: "/BugReport/BulkNoteInsert",
  CreateEmployeeModule: "/EmployeeMaster/CreateEmployeeModule",
  GetEmployeeModule: "/EmployeeMaster/GetEmployeeModule",
  DeleteEmployeeModule: "/EmployeeMaster/DeleteEmployeeModule",
  UpdateStatusCopy: "/ManageExpense/UpdateStatusCopy",
  ExpenceDetails: "/ManageExpense/ExpenseDetails",
  AMC_Payment_Installment_Insert:
    "/AccountsPaymentInstallment/AMC_Payment_Installment_Insert",
  CoorDashboard_Paid_Request_Status:
    "/CoordinatorDashboard/CoorDashboardPaidRequestStatus",
  CoorDashboard_Developer_Availability:
    "/CoordinatorDashboard/CoorDashboardDeveloperAvailability",
  CoorDashboard_Ticket_Close_Assign:
    "/CoordinatorDashboard/CoorDashboardTicketCloseAssign",
  CoorDashboard_Financial_Recovery_Quotation:
    "/CoordinatorDashboard/CoorDashboardFinancialRecoveryQuotation",
  CoorDashboard_Top_Client_Amount:
    "/CoordinatorDashboard/CoorDashboardTopClientAmount",
  CoorDashboard_Current_Month_Bifurcation:
    "/CoordinatorDashboard/CoorDashboard_Current_Month_Bifurcation",
  CoorDashboard_Quotation_Month:
    "/CoordinatorDashboard/CoorDashboard_Quotation_Month",
  ManagerDashboard_Ticket_Category_Analysis:
    "/ManagerDashboard/ManagerDashboard_Ticket_Category_Analysis",
  ManagerDashboard_New_Quarter_Sales:
    "/ManagerDashboard/ManagerDashboard_New_Quarter_Sales",
  ManagerDashboard_Paid_Request_Status:
    "/ManagerDashboard/ManagerDashboard_Paid_Request_Status",
  // TSAAggrementSearch: "/TSAAgreement/TSAAggrementSearch",
  TSAAggrementSearch: "/TSAAgreement/TSAAgreementSearch",
  TSACancel: "/TSAAgreement/TSACancel",
  ConfirmTSA: "/TSAAgreement/ConfirmTSA",
  TSAHold: "/TSAAgreement/TSAHold",
  TSAAgreementVarification: "/TSAAgreement/TSAAgreementVarification",
  ManagerDashboard_New_Sales: "/ManagerDashboard/ManagerDashboard_New_Sales",
  ManagerDashboard_Received_Recovery:
    "/ManagerDashboard/ManagerDashboard_Received_Recovery",
  ManagerDashboard_Top_Client_Amount:
    "/ManagerDashboard/ManagerDashboard_Top_Client_Amount",
  CreateTechnicalSupportAgreement:
    "/TSAAgreement/CreateTechnicalSupportAgreement",
  ManagerDashboard_Delay_Recovery:
    "/ManagerDashboard/ManagerDashboard_Delay_Recovery",
  TSAMarque: "/TSAAgreement/TSAMarque",
  ClientFeedbackSearch: "/Feedback/ClientFeedbackSearch",
  ClientFeedbackTransaction: "/Feedback/ClientFeedbackTransaction",
  ProjectVsAMCMapping: "/ProjectMasterUpdate/ProjectVsAMCMapping",
  ManagerDashboard_Recovery_Quarter:
    "/ManagerDashboard/ManagerDashboard_Recovery_Quarter",
  ManagerDashboard_Ageing_POC: "/ManagerDashboard/ManagerDashboard_Ageing_POC",
  ManagerDashboard_Total_Pending:
    "/ManagerDashboard/ManagerDashboard_Total_Pending",
  CoorDashboard_Total_Pending:
    "/CoordinatorDashboard/CoorDashboardTotalDonePending",
  CreateSalesLead: "/SalesLead/CreateSalesLead",
  DeadSalesLead: "/SalesLead/DeadSalesLead",
  ConvertedSalesLead: "/SalesLead/ConvertedSalesLead",
  SearchSalesLeads: "/SalesLead/SearchSalesLeads",
  UploadEmployeeSignature: "/EmployeeMaster/UploadEmployeeSignature",
  ResendEmail: "/SalesLead/ResendEmail",
  EditSalesLead: "/SalesLead/EditSalesLead",
  UpdateSalesLead: "/SalesLead/UpdateSalesLead",
  Lead_Email_Log: "/SalesLead/Lead_Email_Log",
  // Tsa_Agreement_Format: "/TSAAgreement/Tsa_Agreement_Format",
  Tsa_Agreement_Format: "/TSAAgreement/GetTsaAgreementFormat",
  Change_Tsa_Agreement_Format: "/TSAAgreement/Change_Tsa_Agreement_Format",
  CreateFeedback: "/Feedback/CreateFeedback",
  ResendFeedbackMail: "/Feedback/ResendFeedbackMail",
  AllEmployeeSearch: "/SalesLead/AllEmployeeSearch",
  CreateEmployeeFeedback: "/EmployeeFeedback/CreateEmployeeFeedback",
  ResendFeedbackWhatsapp: "/Feedback/ResendFeedbackWhatsapp",
  EmployeeFeedbackSearch: "/EmployeeFeedback/EmployeeFeedbackSearch",
  ShowFullFeedback: "/EmployeeFeedback/ShowFullFeedback",
  ShowAverageRating: "/EmployeeFeedback/ShowAverageRating",
  EmployeeFeebackBind: "/EmployeeFeedback/EmployeeFeebackBind",
  EmployeeFeedbackTransaction: "/EmployeeFeedback/EmployeeFeedbackTransaction",
  ResendEmployeeFeedbackWhatsapp:
    "/EmployeeFeedback/ResendEmployeeFeedbackWhatsapp",
  ResendEmployeeFeedbackMail: "/EmployeeFeedback/ResendEmployeeFeedbackMail",
  EmployeeFeedbackAvg: "/EmployeeFeedback/EmployeeFeedbackAvg",
  GetWorkingHours: "/CRMAttendance/GetWorkingHours",
  GetEmployeeTransactions: "/CRMAttendance/GetEmployeeTransactions",
  EmployeeBind: "/CRMAttendance/EmployeeBind",
  WeaklyMonthlyBreakCount: "/CRMAttendance/WeaklyMonthlyBreakCount",
  WeaklyMonthlyBreakHours: "/CRMAttendance/WeaklyMonthlyBreakHours",
  EmployeeFeedbackDashboard: "/Attendence/EmployeeFeedbackDashboard",
  ClientFeedbackDashboard: "/CRMAttendance/ClientFeedbackDashboard",
  EmailerSearch: "/Email/EmailerSearch",
  RepushMail: "/Email/RepushMail",
  GetFlagProject: "/ProjectMasterUpdate/GetFlagProject",
  UpdateFlagProject: "/ProjectMasterUpdate/UpdateFlagProject",
  EmployeeEmail: "/Email/EmployeeEmail",
  SendTaxInvoiceMailFinal:
    "/AccountsPaymentInstallment/SendTaxInvoiceMailFinal",
  TaxInvoiceLog: "/AccountsTaxInvoice/TaxInvoiceLog",
  MorningWishSave: "/MorningWish/MorningWishSave",
  MorningWishSearch: "/MorningWish/MorningWishSearch",
  RemoveMorningWish: "/MorningWish/RemoveMorningWish",
  UpdateMorningWish: "/MorningWish/UpdateMorningWish",
  EditMorningWish: "/MorningWish/EditMorningWish",
  UploadEmployeeImages: "/EmployeeMaster/UploadEmployeeImages",
  RemoveEmployeeImages: "/EmployeeMaster/RemoveEmployeeImages",
  SearchEmployeeImages: "/EmployeeMaster/SearchEmployeeImages",
  ForceFullyShortBreakAttendanceSave:
    "/CRMAttendance/ForceFullyShortBreakAttendanceSave",
  ForceFullyShortBreakAttendanceSearch:
    "/CRMAttendance/ForceFullyShortBreakAttendanceSearch",
  Old_Mantis_Sub_Team_Select: "/MasterBind/Old_Mantis_Sub_Team_Select",
  Old_Mantis_Team_Select: "/MasterBind/Old_Mantis_Team_Select",
  Attendence_Report: "/CRMAttendence/Attendence_Report",
  MonthWiseAttendanceReoprt: "/CRMAttendence/MonthWiseAttendanceReoprt",
  AttendanceReoprtTypeWise: "/CRMAttendance/AttendanceReportTypeWise",
  WOandOLTypeWise: "/CRMAttendance/WOandOLTypeWise",
  SaveFilterTableReprintData: "/DynamicFilter/SaveFilterTableReprintData",
  GetFilterTableReprintData: "/DynamicFilter/GetFilterTableReprintData",
  GetFeaturesStatus: "/Circular/GetFeaturesStatus",
  Reporter_Select_Employee: "/MasterBind/Reporter_Select_Employee",
  ClientFeedbackStatsGraph: "/ClientFeedbackDashboard/ClientFeedbackStatsGraph",
  ClientFeedbackRatingGraph:
    "/ClientFeedbackDashboard/ClientFeedbackRatingGraph",
  CreateManhourEntry: "/ViewIssue/CreateManhourEntry",
  ClientFeedbackAggregates: "/ClientFeedbackDashboard/ClientFeedbackAggregates",
  ClientFeedbackList: "/ClientFeedbackDashboard/ClientFeedbackList",

  AIClientDetails: "/AI/AIClientDetails",
  ThreeMonthClientGoodFeedbackList:
    "/ClientFeedbackDashboard/ThreeMonthClientGoodFeedbackList",
  AIClientOpening: "/AI/AIClientOpening",
  AIClientDashboard: "/AI/AIClientDashboard",
  AIRateCardMaster: "/AI/AIRateCardMaster",
  AIClientUpdatePatientAccess: "/AI/AIClientUpdatePatientAccess",
  AIClientLedger: "/AI/AIClientLedger",
  AIClientQuestionMaster: "/AI/AIClientQuestionMaster",
  AIClientQuestionMasterInsert: "/AI/AIClientQuestionMasterInsert",
  WeaklyMonthlyDeveloperFreeManMinute:
    "/MantisSummary/WeaklyMonthlyDeveloperFreeManMinute",
  ResolutionPointWeekwise: "/MantisSummary/ResolutionPointWeekwise",
  GetConvertedSalesLeadsAlert: "/ProjectMaster/GetConvertedSalesLeadsAlert",
  FestivalWishSave: "/MorningWish/FestivalWishSave",
  FestivalWishUpdate: "/MorningWish/FestivalWishUpdate",
  EditFestivalWish: "/MorningWish/EditFestivalWish",
  RemoveFestivalWish: "/MorningWish/RemoveFestivalWish",
  FestivalWishSearch: "/MorningWish/FestivalWishSearch",
  ProjectRateListSave: "/AccountsPaymentInstallment/ProjectRateListSave",
  SearchProjectRateList: "/AccountsPaymentInstallment/SearchProjectRateList",
  EditProjectRateList: "/AccountsPaymentInstallment/EditProjectRateList",
  ProjectRateListUpdate: "/AccountsPaymentInstallment/ProjectRateListUpdate",
  OpenPI_Select: "/AdvanceAmount/OpenPI_Select",
  OpenPI_SelectPINo: "/AdvanceAmount/OpenPI_SelectPINo",
  POAttachementUpload: "/AccountsPaymentInstallment/POAttachementUpload",
  ViewExpenseListSummary: "/ManageExpense/ViewExpenseListSummary",
  EmployeeFeedbackAggregates:
    "/EmployeeFeedbackDashboard/EmployeeFeedbackAggregates",
  EmployeeFeedbackList: "/EmployeeFeedbackDashboard/EmployeeFeedbackList",
  ThreeMonthEmployeeGoodFeedbackList:
    "/EmployeeFeedbackDashboard/ThreeMonthEmployeeGoodFeedbackList",
  EmployeeFeedbackStatsGraph:
    "/EmployeeFeedbackDashboard/EmployeeFeedbackStatsGraph",
  EmployeeFeedbackRatingGraph:
    "/EmployeeFeedbackDashboard/EmployeeFeedbackRatingGraph",

  ////Smart Report //////

  CreateSmartReportProjectMap: "/SmartReport/CreateSmartReportProjectMap",
  GetSmartReportProjectList: "/SmartReport/GetSmartReportProjectList",
  UpdateSmartReportProjectMap: "/SmartReport/UpdateSmartReportProjectMap",
  BindProjectSmartReport: "/SmartReport/BindProjectSmartReport",

  AddTest: "/SmartReport/AddTest",
  UpdateTest: "/SmartReport/UpdateTest",

  BindInvestigation: "/SmartReport/BindInvestigation",
  Investigation_Description: "/SmartReport/Investigation_Description",
  BindTestgrid: "/SmartReport/BindTestgrid",

  GetDescription: "/SmartReport/GetDescription",

  GetRiskFactor: "/SmartReport/GetRiskFactor",
  Investigation_Riskfactor: "/SmartReport/Investigation_Riskfactor",

  BindQRCodeGrid: "/SmartReport/BindQRCodeGrid",

  Centre_QRCode: "/SmartReport/Centre_QRCode",
  Centre_DoctorSignature: "/SmartReport/Centre_DoctorSignature",
  BindDoctorSignature: "/SmartReport/BindDoctorSignature",
  GetReportHeader: "/SmartReport/GetReportHeader",
  Smartreport_header: "/SmartReport/Smartreport_header",
  GetReportCount: "/SmartReport/GetReportCount",
  InsertReportcount: "/SmartReport/InsertReportcount",
};
