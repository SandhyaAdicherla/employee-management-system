import { getInitials } from "../utils/Avatar.util";
import CommonModal
from "./CommonModal";

function UserProfileModal({
  user,
  onClose
}) {

  return (

   <CommonModal
    title="My Profile"
    onClose={onClose}
    >
        <div className="employee-profile-header">
        
            <div className="employee-avatar-large">
                {getInitials(user?.username)}
            </div>

            <h1>{user?.username}</h1>

            <p>{user?.email}</p>

            <div className="employee-badges">

                <span className="department-badge">
                {user?.role}
                </span>

            </div>

        </div>

    </CommonModal>

  );

}

export default UserProfileModal;