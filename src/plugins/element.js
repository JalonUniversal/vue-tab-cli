import Vue from 'vue';
import {
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Select,
  Option,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Cascader,
  Tabs,
  TabPane,
  Row,
  Col,
  Form,
  FormItem,
  DatePicker,
  Card,
  Pagination,
  Loading,
  Tag,
  Popover,
  Popconfirm,
  Checkbox,
  CheckboxGroup,
  Steps,
  Step,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Upload,
  Alert,
  Tree,
  InputNumber,
  Collapse,
  CollapseItem,
  Image,
  Divider,
  Switch,
  Autocomplete,
  TimePicker,
} from 'element-ui';

[
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Select,
  Option,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Cascader,
  Tabs,
  TabPane,
  Row,
  Col,
  Form,
  FormItem,
  DatePicker,
  Card,
  Pagination,
  Loading,
  Tag,
  Popover,
  Popconfirm,
  Checkbox,
  CheckboxGroup,
  Steps,
  Step,
  Radio,
  RadioGroup,
  Upload,
  Alert,
  Tree,
  InputNumber,
  Collapse,
  CollapseItem,
  Image,
  Divider,
  Switch,
  Autocomplete,
  TimePicker
].forEach(plugin => Vue.use(plugin));

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
