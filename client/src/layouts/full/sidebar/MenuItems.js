import {
  IconChartArcs3, IconCopy, IconLayoutDashboard, IconAlphabetCyrillic, IconChartBar, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [

  {
    id: uniqueId(),
    title: 'Thống kê',
    icon: IconChartBar,
    href: '/statiscal',
  },
  {
    id: uniqueId(),
    title: 'Kế hoạch',
    icon: IconAlphabetCyrillic,
    href: '/table-list?type=plan',
  },
  
  {
    id: uniqueId(),
    title: 'Sản phẩm',
    icon: IconChartArcs3,
    href: '/product',
  },
  
  {
    id: uniqueId(),
    title: 'Tài khoản',
    icon: IconAlphabetCyrillic,
    href: '/table-list?type=user',
  },
];

export default Menuitems;
