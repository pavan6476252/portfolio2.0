import React from "react";
import AdminSocialIconsSection from "./sections/admin.socialicons.section";
import AdminTechnologiesSection from "./sections/admin.technologies.section";
import AdminHeroSection from "./sections/admin.hero.section";
import AdminIntroSection from "./sections/admin.intro.section";
import AdminAbilitiesSection from "./sections/admin.abilities.section";
function AdminDashboardScreen() {
  return (
    <div className="container mx-auto  p-4">
      <AdminHeroSection />
      <hr />
      <AdminIntroSection />
      <hr />
      <AdminSocialIconsSection />
      <hr />
      <AdminAbilitiesSection />
      <hr />
      <AdminTechnologiesSection />
      <hr />
    </div>
  );
}

export default AdminDashboardScreen;
