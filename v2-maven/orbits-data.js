export const ORBITS = {
  "oncology": {
    slug: "oncology", file: "Oncology.dc.html", name: "Oncology", status: "Live",
    accent: "#E3735C",
    cardHook: "\u221241% re-admission rate in a controlled clinical trial.",
    hero: "Oncology orbits: fewer readmissions, calmer patients, and a care team that spends less time on the phone.",
    sub: "Results proven against usual care in a controlled surgical oncology trial. Every orbit starts from the numbers your service line already reports, readmissions, call volume, preparedness, and is built to move them.",
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
    hero: "Cardiology orbits: better outcomes across the whole cardiac journey, from first diagnosis to lifelong management.",
    sub: "Coronary disease and heart failure are managed for life, and almost all of that management happens at home. Orbits cover the whole pathway: a new diagnosis, preparation for a cath or ablation, recovery after an event, medication and lifestyle adherence, lifelong management, and getting far more patients into and through cardiac rehab, one of the strongest outcome levers you have.",
    costMoments: [
      {t: "A new diagnosis, absorbed alone", d: "Coronary disease or heart failure explained in one visit, then managed at home for years."},
      {t: "Recovery after a cardiac event", d: "Patients go home with a binder and a follow-up date, and manage the hardest weeks alone."},
      {t: "Medication and lifestyle adherence", d: "The between-visit behaviors that determine whether the event repeats."},
      {t: "Cardiac rehab enrollment and completion", d: "Reimbursed and well evidenced, and most eligible patients never start or never finish."}
    ],
    coverage: ["Post-event recovery", "Cardiac rehab enrollment and completion", "Procedure preparation: cath, ablation", "Chronic management support"],
    provenLabel: "Result from a Pritikin Cardiac Rehab pilot at two leading Midwest healthcare organizations",
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
    proof: "A pilot with Pritikin Cardiac Rehab, conducted at two leading Midwest healthcare organizations, produced a +20\u201340% year-over-year increase in monthly Cardiac Rehab enrollment. The cardiology orbit is a blueprint built on that result and on the platform's controlled trial evidence.",
    statusNote: "Blueprint with proven enrollment results from the Pritikin Cardiac Rehab pilot."
  },
  "orthopedics": {
    slug: "orthopedics", file: "Orthopedics.dc.html", name: "Orthopedics", status: "Blueprint",
    accent: "#1E3A5F",
    cardHook: "Patients ready for surgery day, PROMs that collect themselves.",
    hero: "Orthopedics orbits: patients who arrive ready, PROMs that collect themselves, and a practice that stands apart.",
    sub: "Your practice already educates patients well and runs a tight schedule. What no one can staff is the 116 days between visits, where prehab, brace use, and home exercise decide the outcome. An orbit carries your protocol into that stretch and reports back on who is keeping up.",
    costMoments: [
      {t: "Day-of cancellations and delays", d: "An unprepared patient costs you block time you cannot sell twice."},
      {t: "Post-op calls to the front desk", d: "Routine recovery questions your MAs field all afternoon, one patient at a time."},
      {t: "Chasing PROMs for the bundle", d: "Scores your quality program requires, collected by staff who were hired to do something else."},
      {t: "Home therapy that quietly stops", d: "The program ends in week two and shows up months later as a stiff knee and a revision conversation."},
      {t: "Patients who arrive with the wrong expectations", d: "Assumptions about records, imaging, and whether surgery is even on the table."},
      {t: "Equipment used incorrectly at home", d: "Braces, crutches, and slings explained once at the counter and never again."},
      {t: "Avoidable ED visits during recovery", d: "Normal swelling and pain, read as an emergency because no one said what normal looks like."},
      {t: "Patients lost after the last follow-up", d: "The episode ends, and with it the relationship that drives the next referral."}
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
    proof: "The Injection Support orbit at WashU is in the EHR auto-issue integration work now in flight: orbits issued automatically to pre-consented patients from a nightly feed out of a leading EHR.",
    statusNote: "Injection Support orbit at WashU, in EHR auto-issue integration."
  },
  "surgical-support": {
    slug: "surgical-support", file: "SurgicalSupport.dc.html", name: "Surgical Support", status: "Live",
    accent: "#4FB3BF",
    cardHook: "Patients who arrive prepared and recover without calling the office five times.",
    hero: "Surgical support orbits: patients who arrive prepared, recover as expected, and stay out of the ED.",
    sub: "Surgery is the moment a health system has the least contact and the most at stake. A surgical support orbit is designed backwards from cancellations, readmissions, and the call volume that lands on your nursing line before and after the procedure.",
    costMoments: [
      {t: "Same-day cancellations and delays", d: "A patient who ate, skipped a prep step, or arrived without a ride costs an OR block."},
      {t: "Readmissions after discharge", d: "Recovery instructions handed over at the least memorable moment of the episode."},
      {t: "Pre-op and post-op call volume", d: "The same prep and recovery questions answered one patient at a time."},
      {t: "Prep and instruction non-adherence", d: "Multi-step preparation delivered as paper, followed unevenly."}
    ],
    coverage: ["Decision and scheduling support", "Pre-op preparation and day-before checklists", "Day-of-surgery logistics and expectations", "Discharge instructions and warning signs", "Recovery milestones and follow-up"],
    provenLabel: "Proven in a controlled clinical trial at Siteman Cancer Center",
    proven: [
      {n: "\u221241%", l: "re-admission rate"},
      {n: "\u221253%", l: "patient calls to the office"},
      {n: "+65%", l: "patient understanding of treatment plan and side effects"},
      {n: "+22%", l: "patient satisfaction"},
      {n: "9 in 10", l: "reported improved recovery navigation"}
    ],
    targets: ["Same-day cancellation rate", "30-day readmission rate", "Pre-op and post-op call volume"],
    financial: [
      {t: "Protected OR throughput", d: "Fewer cancellations and delays keep expensive block time full."},
      {t: "Readmission cost avoidance", d: "The \u221241% trial result applied to your surgical readmission costs."},
      {t: "Recovered nursing time", d: "\u221253% fewer calls is capacity your pre-op and post-op teams get back."}
    ],
    proofTitle: "The trial itself was a surgical orbit",
    proof: "CareOrbit's controlled clinical trial was a pancreatic cancer surgery support orbit at Washington University and Siteman Cancer Center. ENT Surgery Support and Fluoroscopy Procedure Support orbits are live at WashU / Siteman today.",
    statusNote: "Surgical support orbits live at WashU / Siteman."
  }
};
export const ORBIT_ORDER = ["oncology", "cardiology", "orthopedics", "womens-health", "bariatrics", "behavioral-health", "medication-therapy", "surgical-support"];
