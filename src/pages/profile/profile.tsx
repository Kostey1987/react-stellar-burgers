import React, { FC } from "react";
import styles from "../../pages/profile/profile.module.css";
import UpdateProfile from "../../components/update-profile/update-profile";
import ProfileMenu from "../profile-menu/profile-menu";

const Profile: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <ProfileMenu />
        <UpdateProfile />
      </div>
    </>
  );
};

export default Profile;
