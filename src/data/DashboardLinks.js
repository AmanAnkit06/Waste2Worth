import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Update Donation Details",
    path: "/dashboard/update-donation",
    type: ACCOUNT_TYPE.DONOR,
    icon: "VscAdd",
  },
  {
    id: 3,
    name: "View Recepients",
    path: "/dashboard/recepients",
    type: ACCOUNT_TYPE.DONOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Update Receiving Details ",
    path: "/dashboard/update-receiving",
    type: ACCOUNT_TYPE.RECEPIENT,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "View Donors",
    path: "/dashboard/donors",
    type: ACCOUNT_TYPE.RECEPIENT,
    icon: "VscVm",
  },
  {
    id: 6,
    name: "Verify Users",
    path: "/dashboard/verify-users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscArchive"
  }
]