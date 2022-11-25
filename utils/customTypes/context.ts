export interface MainContext {
  user: {
    type: "admin" | "customer" | "guest";
    name: string;
    email: string;
    ref: string;
    level: number;
    service: string;
    role: string
  };
  alert: {
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    messages: string;
  };
  page: {
    curLayout: "welcomeLayout" | "mainLayout" | "questionLayout" | "contestLayout" | "adminLayout";
    curPage: string;
    curQuestionniare: number;
    curQuestion: number;
    curSubQuestion: number;
    loadingData: boolean;
  };
  global?: {
    signature?: string
    addmissionDate?: string, 
    returnByDate?: string,
    procedure?: string,
    hospitalSite?: string
  }
}
