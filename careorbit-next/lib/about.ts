/* About page content, ported verbatim from About.dc.html renderVals().
 * Copy is brief-locked.
 *
 * DEAD CODE NOT PORTED: each team member carries a `linkedin` URL, but the
 * markup renders only the headshot, name, role and bio - there is no link.
 *
 * Michael's headshot lives OUTSIDE the site root in v2-maven
 * (`../uploads/1722391799177.jpg`), the one cross-folder reference found in
 * Phase 0. Copied into public/images/headshot-michael.jpg so the app is
 * self-contained.
 */
export const TEAM = [
  {
    name: "Michael Margraf",
    role: "Co-founder & CEO",
    slotId: "headshot-michael",
    src: "/images/headshot-michael.jpg",
    bio: "Michael runs all facets of the business and stays personally involved in every client relationship, with nearly 20 years leading technology startups. He holds a BBA from Washington University in St. Louis.",
  },
  {
    name: "Jeff Coburn",
    role: "Co-founder & Chief Strategy Officer",
    slotId: "headshot-jeff",
    src: "/images/headshot-jeff.png",
    bio: "Jeff is the co-inventor of the orbit and heads engagement: strategy, content, and how every orbit earns a patient's attention. Most recently he was SVP / Director of Creative Strategy for Momentum Worldwide.",
  },
  {
    name: "David Scott",
    role: "Co-founder",
    slotId: "headshot-david",
    src: "/images/headshot-david.png",
    bio: "David is a Fortune 500 executive and serial entrepreneur with multiple exits who guides operations and commercial strategy. He holds a J.D., cum laude, from St. Louis University School of Law.",
  },
  {
    name: "Jim Peck",
    role: "Head of Development",
    slotId: "headshot-jim",
    src: "/images/headshot-jim.png",
    bio: "Jim leads the development team behind the CareOrbit platform, from the patient-facing orbit to care-team dashboards and EHR workflow.",
  },
];

export const FACTS = [
  "10+ years building patient engagement",
  "St. Louis roots; WashU, Siteman, and BJC relationships",
  "Live within large, complex health systems",
  "A Customer Success Manager on every care team",
];
