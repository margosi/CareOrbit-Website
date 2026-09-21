export const ORBITS = {
  "oncology": {
    slug: "oncology", file: "Oncology.dc.html", name: "Oncology", status: "Live",
    accent: "#E3735C",
    cardHook: "\u221241% re-admission rate in a controlled clinical trial.",
    hero: "Oncology orbits: fewer readmissions, calmer patients, and a care team that spends less time on the phone.",
    sub: "The controlled clinical trial behind CareOrbit's numbers is oncology data. An oncology orbit is designed backwards from the readmissions, call volume, and preparedness problems your service line already tracks.",
    costMoments: [
      {t: "Readmissions after cancer surgery", d: "The costliest between-visit failure in a surgical oncology program."},
      {t: "Unprepared patients arriving for treatment", d: "Delays, rescheduling, and lost throughput across surgery, infusion, and radiation."},
      {t: "High inbound call volume to nursing staff", d: "Preparedness questions that a guided journey should have answered."},
      {t: "Fragmented education across a long journey", d: "Surgery, infusion, and radiation each hand the patient a different stack of paper."}
    ],
    coverage: ["Diagnosis and treatment planning", "Surgical support: ENT / head & neck live at WashU / Siteman today", "Infusion and radiation preparation", "Recovery, warning signs, and readmission prevention", "Survivorship"],
    provenLabel: "Proven in a controlled clinical trial at Siteman Cancer Center",
    proven: [
      {n: "\u221241%", l: "re-admission rate"},
      {n: "\u221253%", l: "patient calls to the office"},
      {n: "+65%", l: "patient understanding of treatment plan and side effects"},
      {n: "+22%", l: "patient satisfaction"},
      {n: "9 in 10", l: "reported improved recovery navigation"}
    ],
    financial: [
      {t: "Readmission cost avoidance", d: "The \u221241% trial result applied to your surgical oncology readmission costs."},
      {t: "Recovered nursing time", d: "\u221253% fewer preparedness calls is capacity your nursing line gets back."},
      {t: "Protected treatment throughput", d: "Better-prepared patients keep surgical and infusion schedules full."}
    ],
    proofTitle: "The strongest evidence we hold is oncology evidence",
    proof: "CareOrbit's controlled clinical trial ran at Siteman Cancer Center in hepatobiliary surgery. Today, ENT Surgery Support and Fluoroscopy Procedure Support orbits are live at WashU / Siteman, with Head & Neck Cancer Tumor Center and Breast Cancer orbits in active build.",
    statusNote: "ENT Surgery Support and Fluoroscopy Procedure Support live at WashU / Siteman; two oncology orbits in build."
  },
  "cardiology": {
    slug: "cardiology", file: "Cardiology.dc.html", name: "Cardiology", status: "Blueprint",
    accent: "#2D5A87",
    cardHook: "+20\u201340% year-over-year cardiac rehab enrollment.",
    hero: "Cardiology orbits: more patients starting and finishing cardiac rehab, and revenue that follows.",
    sub: "Cardiac rehab is reimbursed, proven, and chronically under-enrolled. A cardiology orbit is designed backwards from enrollment, completion, and the readmissions that follow a missed recovery.",
    costMoments: [
      {t: "Cardiac rehab under-enrollment", d: "Reimbursement is available; the patients never start."},
      {t: "Drop-off between referral and first session", d: "The gap where motivation, logistics, and understanding fail."},
      {t: "Post-event readmissions", d: "Patients discharged after a cardiac event without a guided recovery."},
      {t: "Medication and lifestyle adherence", d: "The between-visit behaviors that determine whether the event repeats."}
    ],
    coverage: ["Post-event recovery", "Cardiac rehab enrollment and completion", "Procedure preparation: cath, ablation", "Chronic management support"],
    provenLabel: "Result from CareOrbit engagement work at Siteman",
    proven: [
      {n: "+20\u201340%", l: "year-over-year increase in monthly Cardiac Rehab program enrollment"}
    ],
    model: {
      label: "A projection built on the enrollment lift above, not a customer result",
      rows: ["25 additional starts per quarter", "\u00d7 36 reimbursable sessions", "\u00d7 $100 Medicare reimbursement per session"],
      total: "$90,000 per quarter, per location"
    },
    financial: [
      {t: "Reimbursable rehab sessions", d: "Every additional enrolled patient is a funded, 36-session program."},
      {t: "Readmission cost avoidance", d: "Completed rehab is one of the strongest levers against cardiac readmission."},
      {t: "Program utilization", d: "Rehab capacity you already staff, actually filled."}
    ],
    proofTitle: "A proven enrollment result, ready to apply",
    proof: "CareOrbit engagement work at Siteman produced a +20\u201340% year-over-year increase in monthly Cardiac Rehab enrollment. The cardiology orbit is a blueprint built on that result and on the platform's controlled trial evidence.",
    statusNote: "Blueprint with proven enrollment results from the Siteman engagement."
  },
  "orthopedics": {
    slug: "orthopedics", file: "Orthopedics.dc.html", name: "Orthopedics", status: "Blueprint",
    accent: "#1E3A5F",
    cardHook: "Patients ready for surgery day, PROMs that collect themselves.",
    hero: "Orthopedics orbits: patients who show up ready for surgery, and PROMs that collect themselves.",
    sub: "Bundled payment and quality programs made PROMs and preparedness a financial matter. An orthopedics orbit is designed backwards from cancellations, collection burden, and post-op call volume.",
    costMoments: [
      {t: "Day-of cancellations", d: "Unprepared patients and empty OR time you cannot recover."},
      {t: "PROMs collection burden", d: "Bundled payment and quality programs demand scores your staff has to chase."},
      {t: "Post-op call volume", d: "Recovery questions that a milestone-based journey should carry."},
      {t: "Discharge and rehab adherence", d: "PT that does not happen shows up later as poor outcomes."}
    ],
    coverage: ["Surgery decision through pre-op preparation", "Day-of expectations", "Post-op recovery milestones", "PT adherence", "PROMs capture at protocol intervals"],
    provenLabel: null,
    proven: null,
    targets: ["Fewer cancellations and delays", "Reduced coordination burden", "PROMs completion rates", "Readmission reduction"],
    financial: [
      {t: "Protected OR throughput", d: "Prepared patients keep surgical schedules intact."},
      {t: "PROMs without added FTEs", d: "Embedded assessments collect at protocol intervals automatically."},
      {t: "Quality program performance", d: "Documentation and scores that bundled payment models require."}
    ],
    proofTitle: "Platform-proven, built for orthopedics",
    proof: "The CareOrbit platform is deployed within large, complex health systems, and embedded PROMs capture is a live, current capability of the Assess pillar. Orthopedics orbits are built as blueprints from at least one measurable outcome, tracked from day one.",
    statusNote: "Blueprint, on a platform deployed within large complex health systems."
  },
  "womens-health": {
    slug: "womens-health", file: "WomensHealth.dc.html", name: "Women's Health", status: "In build",
    accent: "#F2B8C6",
    cardHook: "Confident, prepared patients across pregnancy and well-woman care.",
    hero: "Women's Health orbits: confident, prepared patients across pregnancy and well-woman care.",
    sub: "Pregnancy is one of the longest, most education-heavy journeys in medicine. A women's health orbit is designed backwards from preparedness, attendance, and the documentation that protects your practice.",
    costMoments: [
      {t: "Long journeys, heavy education needs", d: "Nine months of questions, delivered today as handouts and portal messages."},
      {t: "Missed and late-entry prenatal care", d: "The appointments that matter most are the easiest to miss."},
      {t: "High communication load on nursing lines", d: "Trimester-specific questions arriving as inbound calls."},
      {t: "Malpractice exposure", d: "Educated, engaged patients and documented education are protective. Factual, and worth stating plainly."}
    ],
    coverage: ["Pregnancy journey support, by trimester through postpartum", "Well-woman visit preparation", "Procedure support"],
    provenLabel: null,
    proven: null,
    targets: ["Patient preparedness and understanding", "Fewer missed appointments", "Reduced call burden", "Documented education touchpoints"],
    financial: [
      {t: "Kept appointments", d: "Prenatal attendance is both a care outcome and a revenue line."},
      {t: "Recovered nursing time", d: "Journey-sequenced education answers the questions before they become calls."},
      {t: "Documented education", d: "A defensible record of what every patient was taught, and when."}
    ],
    proofTitle: "In active build: Maternal Care",
    proof: "The Maternal Care orbit is in active build now. The engagement mechanism it runs on is the same one proven in CareOrbit's controlled clinical trial at Siteman Cancer Center.",
    statusNote: "Maternal Care orbit in active build."
  },
  "bariatrics": {
    slug: "bariatrics", file: "Bariatrics.dc.html", name: "Bariatrics", status: "In build",
    accent: "#E3735C",
    cardHook: "More qualified candidates completing the path to surgery.",
    hero: "Bariatric orbits: more qualified patients reaching surgery, and stronger outcomes after it.",
    sub: "Bariatric programs lose a large share of candidates on the long pre-surgical pathway. A bariatric orbit is designed backwards from pipeline conversion, attendance, and staged post-op adherence.",
    costMoments: [
      {t: "Pre-surgical attrition", d: "Clearances, supervised weight management, psych evaluation, insurance requirements: every step loses candidates."},
      {t: "Day-of cancellations", d: "High-value OR time lost to unprepared patients."},
      {t: "Post-op adherence", d: "Staged diet progression and follow-up schedules that patients navigate alone."},
      {t: "Long-term regain", d: "The outcome that undoes the program's clinical and financial case."}
    ],
    coverage: ["Program entry through pre-op requirements tracking", "Surgery preparation", "Staged post-op progression", "Long-term maintenance touchpoints"],
    provenLabel: null,
    proven: null,
    targets: ["Pipeline conversion: candidates completing requirements and reaching surgery", "Fewer cancellations", "Follow-up attendance", "Adherence"],
    financial: [
      {t: "Pipeline conversion is direct revenue", d: "Each completed bariatric surgery is high-value; reducing pre-op attrition pays for the program."},
      {t: "Protected OR time", d: "Prepared patients on surgery day."},
      {t: "Follow-up attendance", d: "The visits that sustain outcomes, kept."}
    ],
    proofTitle: "In active build: Bariatrics",
    proof: "The Bariatric orbit is in active build now, on the platform proven in CareOrbit's controlled clinical trial at Siteman Cancer Center.",
    statusNote: "Bariatric orbit in active build."
  },
  "behavioral-health": {
    slug: "behavioral-health", file: "BehavioralHealth.dc.html", name: "Behavioral Health", status: "In build",
    accent: "#2D5A87",
    cardHook: "Measurement-based care without the administrative weight.",
    hero: "Behavioral health orbits: measurement-based care without the administrative weight.",
    sub: "Validated screenings, delivered on schedule, scored automatically, and surfaced to the care team when risk is rising. eScreening is a live CareOrbit product today.",
    costMoments: [
      {t: "No-show rates", d: "The appointment gap that behavioral health feels more than any specialty."},
      {t: "Screening and outcome-measure collection burden", d: "Measurement-based care demands scores your staff has to administer by hand."},
      {t: "Engagement drop-off between sessions", d: "The work of therapy happens between visits, unsupported."},
      {t: "Documentation demands", d: "Value-based and quality programs require defensible outcome records."}
    ],
    coverage: ["Intake and expectation-setting", "Between-session engagement and skills reinforcement", "Scheduled validated screenings via eScreening", "Rising-risk surfacing to the care team"],
    provenLabel: null,
    proven: null,
    targets: ["Screening completion rates", "Appointment attendance", "Sustained engagement", "Defensible outcome documentation"],
    financial: [
      {t: "Kept appointments", d: "Engagement between sessions protects attendance at the next one."},
      {t: "Screening without added staff time", d: "Validated measures collected and scored automatically."},
      {t: "Value-based program performance", d: "Outcome documentation that quality contracts pay on."}
    ],
    proofTitle: "eScreening is live today",
    proof: "eScreening, CareOrbit's validated screening product, is live as a product today, and surfacing rising-risk patients early is what it is built to do. The eScreening Behavioral Health orbit is in build now.",
    statusNote: "eScreening live as a product; Behavioral Health orbit in build."
  },
  "medication-therapy": {
    slug: "medication-therapy", file: "MedicationTherapy.dc.html", name: "Medication Therapy & Adherence", status: "In integration",
    accent: "#1E3A5F",
    cardHook: "Patients who start therapy, stay on it, and know what to do when side effects hit.",
    hero: "Medication therapy orbits: patients who understand their therapy, stay on it, and know what to do when side effects hit.",
    sub: "Specialty and injectable therapies fail most often in the first months, for reasons education and timely check-ins can reach. A medication therapy orbit is designed backwards from persistence, calls, and chair utilization.",
    costMoments: [
      {t: "Non-adherence and early discontinuation", d: "Especially specialty and injectable therapies, where a stopped therapy is a failed episode of care."},
      {t: "Side-effect-driven calls and ED visits", d: "Expected side effects, experienced as emergencies."},
      {t: "Missed refills and infusion no-shows", d: "Empty chairs and broken persistence."},
      {t: "Onboarding confusion at therapy start", d: "Prior auth, first fill, first injection: the drop-off point."}
    ],
    coverage: ["Therapy onboarding", "Injection and infusion preparation and technique support", "Side effect expectation-setting and management", "Refill and appointment touchpoints", "Adherence tracking"],
    provenLabel: "Proven in a controlled clinical trial at Siteman Cancer Center",
    proven: [
      {n: "+65%", l: "patient understanding of treatment plan and side effects. Understanding is the front door to adherence."}
    ],
    targets: ["Persistence and refill behavior", "Fewer therapy-related inbound calls", "Infusion chair utilization"],
    financial: [
      {t: "Therapy persistence", d: "Patients who stay on therapy complete the episode of care your program is paid on."},
      {t: "Infusion chair utilization", d: "Prepared patients keep infusion schedules full."},
      {t: "Recovered clinical time", d: "Side-effect questions answered by the journey, not the phone line."}
    ],
    proofTitle: "A real, named proof point",
    proof: "The Injection Support orbit at WashU is in the Epic auto-issue integration work now in flight: orbits issued automatically to pre-consented patients from a nightly Epic feed.",
    statusNote: "Injection Support orbit at WashU, in Epic auto-issue integration."
  }
};
export const ORBIT_ORDER = ["oncology", "cardiology", "orthopedics", "womens-health", "bariatrics", "behavioral-health", "medication-therapy"];
