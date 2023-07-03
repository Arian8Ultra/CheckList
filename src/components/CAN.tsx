/* eslint-disable react-refresh/only-export-components */
import { Box } from "@mui/system";
import useAbilityStore from "../stores/abilityStore";
interface CANProps {
  children: React.ReactNode;
  permissionNeeded?: string|null;
  display?: string;
}

export default function CAN(props: CANProps) {
  const { children, permissionNeeded } = props;
  const zuAbilities = useAbilityStore((state) => state.abilities);
  const abilities = zuAbilities != null ? zuAbilities : [];

  const handlePermissionVisibility = () => {
    if (
      abilities.includes(permissionNeeded) ||
      permissionNeeded == null ||
      abilities.includes("SUPER_ADMIN")
    ) {
      return "visible";
    }
    return "hidden";
  };
  const handlePermissionSize = () => {
    if (
      abilities.includes(permissionNeeded) ||
      permissionNeeded == null ||
      abilities.includes("SUPER_ADMIN")
    ) {
      return {};
    }
    return 0;
  };
  const handlePermissionDisplay = () => {
    if (
      abilities.includes(permissionNeeded) ||
      permissionNeeded == null ||
      abilities.includes("SUPER_ADMIN")
    ) {
      return {};
    }
    return "none";
  };

  return (

      <Box
        component="div"
        visibility={handlePermissionVisibility()}
        margin={0}
        sx={{
          width: handlePermissionSize(),
          height: handlePermissionSize(),
          minWidth: handlePermissionSize(),
          minHeight: handlePermissionSize(),
          fontSize: handlePermissionSize(),
          display: { xs: handlePermissionDisplay() },
        }}
      >
        {children}
      </Box>
  );
}
