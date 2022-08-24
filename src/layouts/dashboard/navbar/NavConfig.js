// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
// import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'console1', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'console2', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'ProData', path: PATH_DASHBOARD.general.projectDataView, icon: ICONS.analytics },
      /*
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      */
    ],
  },

  // MANAGEMENT
  {
    subheader: 'management',
    items: [
      //-------------------------------------------新增-------------------------------------------------//
      // 项目管理
      {
        title: 'Project',
        path: PATH_DASHBOARD.projectManagement.root,
        icon: ICONS.booking,
        children: [
          { title: 'ViewPro', path: PATH_DASHBOARD.projectManagement.projectView },
          { title: 'AddPro', path: PATH_DASHBOARD.projectManagement.newProject },
        ],
      },
      // 基础配置
      {
        title: 'Basics',
        path: PATH_DASHBOARD.basicConfiguration.root,
        icon: ICONS.menuItem,
        children: [
          { title: 'Customer', path: PATH_DASHBOARD.basicConfiguration.customerInformation },
          { title: 'Supplier', path: PATH_DASHBOARD.basicConfiguration.supplierInformation },
          { title: 'TerminalCustomer', path: PATH_DASHBOARD.basicConfiguration.terminalCustomerInformation },
          { title: 'TurnoverBox', path: PATH_DASHBOARD.basicConfiguration.turnoverBoxInformation },
          { title: 'Price', path: PATH_DASHBOARD.basicConfiguration.priceInformation },
        ],
      },
      // 周转管理
      {
        title: 'Turnover',
        path: PATH_DASHBOARD.turnoverManagement.root,
        icon: ICONS.analytics,
        children: [
          { title: 'TurnoverOrder', path: PATH_DASHBOARD.turnoverManagement.turnoverOrderManagement },
          { title: 'SupplierArrival', path: PATH_DASHBOARD.turnoverManagement.supplierSupply },
        ],
      },
      // 库存管理
      {
        title: 'Inventory',
        path: PATH_DASHBOARD.inventoryManagement.root,
        icon: ICONS.banking,
        children: [
          { title: 'InventoryQuery', path: PATH_DASHBOARD.inventoryManagement.inventoryQuery },
        ],
      },
      // 结算管理
      {
        title: 'Settlement',
        path: PATH_DASHBOARD.settlementManagement.root,
        icon: ICONS.cart,
        children: [
          { title: 'Settlement', path: PATH_DASHBOARD.settlementManagement.settlementManagement1 },
        ],
      },
      // 工单管理
      {
        title: 'WorkOrder',
        path: PATH_DASHBOARD.workOrderManagement.root,
        icon: ICONS.invoice,
        children: [
          { title: 'WorkOrder', path: PATH_DASHBOARD.workOrderManagement.workOrderManagement1 },
        ],
      },
      // 报表管理
      {
        title: 'Report',
        path: PATH_DASHBOARD.reportManagement.root,
        icon: ICONS.mail,
        children: [
          { title: 'Report', path: PATH_DASHBOARD.reportManagement.reportManagement },
        ],
      },
      // 系统管理
      {
        title: 'System',
        path: PATH_DASHBOARD.systemManagement.root,
        icon: ICONS.kanban,
        children: [
          { title: 'FileUpload', path: PATH_DASHBOARD.systemManagement.fileUpload },
          { title: 'FileDownload', path: PATH_DASHBOARD.systemManagement.fileDownload },
          { title: 'UserManagement', path: PATH_DASHBOARD.systemManagement.userManagement },
        ],
      },
      //------------------------------------------------------------------------------------------------//
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      /*
      // E-COMMERCE
      {
        title: 'ecommerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },
      */

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      /*
      // BLOG
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },*/
    ],
  },
  //-------------------------------------------新增-------------------------------------------------//
  {
    subheader: 'Bill',
    items: [
      // 项目管理
      {
        title: 'Bill',
        path: PATH_DASHBOARD.ladingBill.root,
        icon: ICONS.booking,
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      { title: 'todo', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
    ],
  },
  /*
    // DEMO MENU STATES
    {
      subheader: 'Other cases',
      items: [
        {
          // default roles : All roles can see this entry.
          // roles: ['user'] Only users can see this item.
          // roles: ['admin'] Only admin can see this item.
          // roles: ['admin', 'manager'] Only admin/manager can see this item.
          // Reference from 'src/guards/RoleBasedGuard'.
          title: 'item_by_roles',
          path: PATH_DASHBOARD.permissionDenied,
          icon: ICONS.menuItem,
          roles: ['admin'],
          caption: 'only_admin_can_see_this_item',
        },
        {
          title: 'menu_level_1',
          path: '#/dashboard/menu_level_1',
          icon: ICONS.menuItem,
          children: [
            { title: 'menu_level_2a', path: '#/dashboard/menu_level_1/menu_level_2a' },
            {
              title: 'menu_level_2b',
              path: '#/dashboard/menu_level_1/menu_level_2b',
              children: [
                {
                  title: 'menu_level_3a',
                  path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3a',
                },
                {
                  title: 'menu_level_3b',
                  path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b',
                  children: [
                    {
                      title: 'menu_level_4a',
                      path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4a',
                    },
                    {
                      title: 'menu_level_4b',
                      path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4b',
                    },
                  ],
                },
              ],
            },
          ],
        },
        { title: 'item_disabled', path: '#disabled', icon: ICONS.menuItem, disabled: true },
        {
          title: 'item_label',
          path: '#label',
          icon: ICONS.menuItem,
          info: (
            <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
              NEW
            </Label>
          ),
        },
        {
          title: 'item_caption',
          path: '#caption',
          icon: ICONS.menuItem,
          caption:
            'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
        },
        { title: 'item_external_link', path: 'https://www.google.com/', icon: ICONS.menuItem },
      ],
    },
    */

];

export default navConfig;
