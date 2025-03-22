"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LeftNav.module.css";
import StartwithSmallLogo from "./StartwithSmallLogo.jsx";

const homeDropdownItems = [
  "Budget Layout",
  "Club Announcement",
  "FeedBackDashboard",
  "Club Login",
  "User Notes",
];

const communityDropdownItems = [
  "IEEE",
  "GoogleDeveloperStudentClubs",
  "ACM",
  "STIC",
];

export default function LeftNav({
  activeItem,
  setActiveItem,
  activeDropdownItem,
  setActiveDropdownItem,
}) {
  const router = useRouter();
  const [homeOpen, setHomeOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  useEffect(() => {
    console.log("LeftNav State:", { activeItem, activeDropdownItem });
  }, [activeItem, activeDropdownItem]);

  const toPathSegment = (item) => item.toLowerCase().replace(/ /g, "-");

  return (
    <nav className={styles.leftNav}>
      <StartwithSmallLogo />
      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${styles.dropdownParent} ${
            activeItem === "Home" ? styles.active : ""
          }`}
          onClick={() => setHomeOpen(!homeOpen)}
        >
          Home
        </li>
        {homeOpen && (
          <ul className={styles.dropdownMenu}>
            {homeDropdownItems.map((item) => (
              <li
                key={item}
                className={`${styles.dropdownItem} ${
                  activeDropdownItem === item ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdownItem(item);
                  router.push(`/dashboard/student/${toPathSegment(item)}`);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <li
          className={`${styles.navItem} ${styles.dropdownParent} ${
            activeItem === "Community" ? styles.active : ""
          }`}
          onClick={() => setCommunityOpen(!communityOpen)}
        >
          Community
        </li>

        {communityOpen && (
          <ul className={styles.dropdownMenu}>
            {communityDropdownItems.map((item) => (
              <li
                key={item}
                className={`${styles.dropdownItem} ${
                  activeDropdownItem === item ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdownItem(item);
                  router.push(`/dashboard/student/${toPathSegment(item)}`);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <li
          className={`${styles.navItem} ${
            activeItem === "Your Profile" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveItem("Your Profile");
            setActiveDropdownItem(null);
            router.push("/dashboard/student/your-profile");
          }}
        >
          Your Profile
        </li>
      </ul>
    </nav>
  );
}
