// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    projectDataView: path(ROOTS_DASHBOARD, '/projectDataView'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  //-----------------------------------新增-----------------------------------//
  // 项目管理
  projectManagement: {
    root: path(ROOTS_DASHBOARD, '/projectManagement'),
    newProject: path(ROOTS_DASHBOARD, '/projectManagement/newProject'),
    projectView: path(ROOTS_DASHBOARD, '/projectManagement/projectView'),
  },
  // 基础配置
  basicConfiguration: {
    root: path(ROOTS_DASHBOARD, '/basicConfiguration'),
    customerInformation: path(ROOTS_DASHBOARD, '/basicConfiguration/customerInformation'),
    supplierInformation: path(ROOTS_DASHBOARD, '/basicConfiguration/supplierInformation'),
    terminalCustomerInformation: path(ROOTS_DASHBOARD, '/basicConfiguration/terminalCustomerInformation'),
    turnoverBoxInformation: path(ROOTS_DASHBOARD, '/basicConfiguration/turnoverBoxInformation'),
    priceInformation: path(ROOTS_DASHBOARD, '/basicConfiguration/priceInformation'),
    newCustomer: path(ROOTS_DASHBOARD, '/basicConfiguration/newCustomer'),
    newSupplier: path(ROOTS_DASHBOARD, '/basicConfiguration/newSupplier'),
    newTerminalCustomer: path(ROOTS_DASHBOARD, '/basicConfiguration/newTerminalCustomer'),
    newPrice: path(ROOTS_DASHBOARD, '/basicConfiguration/newPrice'),
    newTurnoverBox: path(ROOTS_DASHBOARD, '/basicConfiguration/newTurnoverBox'),
    bindingTerminal:(id)=> path(ROOTS_DASHBOARD, `/basicConfiguration/bindingTerminal/${id}`),
    editCustomer:(id)=> path(ROOTS_DASHBOARD, `/basicConfiguration/editCustomer/${id}`),
  },
  // 周转管理
  turnoverManagement: {
    root: path(ROOTS_DASHBOARD, '/turnoverManagement'),
    turnoverOrderManagement: path(ROOTS_DASHBOARD, '/turnoverManagement/turnoverOrderManagement'),
    new: path(ROOTS_DASHBOARD, '/turnoverManagement/new'),
    viewTurnoverOrder: path(ROOTS_DASHBOARD, '/turnoverManagement/viewTurnoverOrder'),
    supplierSupply: path(ROOTS_DASHBOARD, '/turnoverManagement/supplierSupply'),
    newSupply: path(ROOTS_DASHBOARD, '/turnoverManagement/newSupply'),
  },
  // 库存管理
  inventoryManagement: {
    root: path(ROOTS_DASHBOARD, '/inventoryManagement'),
    inventoryQuery: path(ROOTS_DASHBOARD, '/inventoryManagement/inventoryQuery'),
  },
  // 结算管理
  settlementManagement: {
    root: path(ROOTS_DASHBOARD, '/settlementManagement'),
    settlementManagement1: path(ROOTS_DASHBOARD, '/settlementManagement/settlementManagement'),
    newSettlement: path(ROOTS_DASHBOARD, '/settlementManagement/newSettlement'),
  },
  // 工单管理
  workOrderManagement: {
    root: path(ROOTS_DASHBOARD, '/workOrderManagement'),
    workOrderManagement1: path(ROOTS_DASHBOARD, '/workOrderManagement/workOrderManagement'),
    newWorkOrder: path(ROOTS_DASHBOARD, '/workOrderManagement/newWorkOrder'),
  },
  // 报表管理
  reportManagement: {
    root: path(ROOTS_DASHBOARD, '/reportManagement'),
    reportManagement: path(ROOTS_DASHBOARD, '/reportManagement/reportManagement'),
    newReport: path(ROOTS_DASHBOARD, '/reportManagement/newReport'),
  },
  // 系统管理
  systemManagement: {
    root: path(ROOTS_DASHBOARD, '/systemManagement'),
    fileUpload: path(ROOTS_DASHBOARD, '/systemManagement/fileUpload'),
    fileDownload: path(ROOTS_DASHBOARD, '/systemManagement/fileDownload'),
    userManagement: path(ROOTS_DASHBOARD, '/systemManagement/userManagement'),
    changeUserInformation: path(ROOTS_DASHBOARD, '/systemManagement/changeUserInformation'),
  },
  //--------------------------------------------------------------------------//
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
