# HerniaSelect — Inguinal Hernia Surgery Procedure Selection Tool

An evidence-based clinical decision support web application designed for general surgeons, surgical residents, hernia specialists, and clinical multidisciplinary teams. **HerniaSelect** guides the tailored selection of surgical repair techniques for groin hernias based on established international consensus guidelines.

---

## Clinical Foundation & Source Guidelines

The algorithmic decision engine synthesizes evidence and recommendations from three primary authorities:

1. **Patient & Hernia Selection Criteria Matrices (`TABLE_1_1__1__9e1397ef.pdf`)**
   - **Table 1: Patient-Related Criteria**: Patient age, biological sex, BMI habitus, anesthesia fitness (ASA status), physical activity level / occupational demands, and prior lower abdominal/pelvic surgery.
   - **Table 2: Hernia-Related Criteria**: Laterality (unilateral vs. bilateral), presentation (primary vs. recurrent after open vs. recurrent after laparoscopic), defect dimension (EHS sizes 1–3 and scrotal), clinical status (reducible, incarcerated, or strangulated), and anatomical defect type (indirect, direct, femoral, or pantaloon).
   - **Table 3: Surgical Method Choice**: Indications and matching criteria for Open Mesh Lichtenstein, Laparoscopic TEP/TAPP, and Open Non-Mesh Shouldice/Herniotomy.

2. **EAES Clinical Practice Guidelines 2026 (`EAES_clinical_practice_guidelines_2026_7606ffca.pdf`)**
   - Multi-society recommendations from the European Association for Endoscopic Surgery (**EAES**), European Hernia Society (**EHS**), and Society of American Gastrointestinal and Endoscopic Surgeons (**SAGES**).
   - Core clinical questions:
     - **KQ#1**: Elective anterior open repair vs. laparo-endoscopic repair (TEP / TAPP) in primary groin hernias.
     - **KQ#2**: Totally Extra-Peritoneal (TEP) vs. Trans-Abdominal Pre-Peritoneal (TAPP) approach.
   - Predefined subgroup analyses:
     - *Female sex*: Higher incidence of femoral hernias and shorter canal favors laparo-endoscopic repair.
     - *BMI ≥ 35 kg/m²*: Evaluates technical difficulty and potential diminution of laparoscopic advantage.
     - *Bilateral hernias*: Clear superiority of laparo-endoscopic single-access repair.
     - *Large inguinoscrotal defects*: Open approach favored due to direct sac control.
     - *Prior extraperitoneal surgery (e.g., radical prostatectomy)*: Obliteration of Retzius space contraindicates TEP.

3. **HerniaSurge International Guidelines for Groin Hernia Management (`Groin_ENG_cov13178_ehs_groin_hernia_management_a5_en_10_lr_1_b05a57f7.pdf`)**
   - **Mesh selection**: Recommends flat, monofilament, macroporous (>1.0–1.5 mm pore size) synthetic mesh. Discourages 3D plug-and-patch and bilayer devices due to chronic pain and migration risks.
   - **Fixation**: No fixation needed in routine laparoscopic indirect repairs; atraumatic glue or self-fixating mesh indicated for large direct defects (EHS M3) to prevent chronic nerve entrapment.
   - **Anesthesia**: Strong recommendation for local infiltration anesthesia in open reducible hernias, particularly in elderly or cardiopulmonary-compromised patients.
   - **Chronic Postoperative Inguinal Pain (CPIP)**: Systematic identification of the iliohypogastric, ilioinguinal, and genital nerves during open repair.

---

## Core Features

### 1. Interactive Procedure Calculator & Decision Engine
- **Patient Parameters**: Age slider and category (`Child <18`, `Adult 18–64`, `Elderly ≥65`), biological sex, real-time BMI calculator with World Health Organization categorization, ASA physical status (fit for GA vs. unfit for GA), activity level (heavy manual laborer/athlete, moderate, sedentary), previous lower abdominal/pelvic surgery, and mesh preference.
- **Hernia Morphology**: Side (unilateral right/left, bilateral), presentation (primary, recurrent after open, recurrent after lap, multi-recurrent), size (EHS 1: <1.5 cm, EHS 2: 1.5–3 cm, EHS 3: >3 cm, giant scrotal), status (reducible, incarcerated, strangulated), and anatomy (indirect/lateral, direct/medial, femoral, combined pantaloon).
- **Instant Output**:
  - Primary recommended procedure with GRADE strength rating.
  - Standardized European Hernia Society (EHS) classification code (e.g., `EHS: P · L2 (Right)`).
  - Alternative procedure options when clinical or institutional resources dictate.
  - TEP vs. TAPP comparative breakdown with clinical nuances.
  - Anesthesia strategy (Local Infiltration vs. General vs. Regional).
  - Flat mesh specifications and fixation strategy.
  - Evidence scorecard: CPIP risk estimate, recurrence rate, convalescence timeline, and day-case surgery suitability.
  - Transparent step-by-step guideline rationale trace.
  - Real-time clinical alerts (Emergency Strangulation, Female Femoral Alert, Prior Extraperitoneal Scarring, GA Contraindication).

### 2. Surgical Technique Comparison Matrix
- Comprehensive side-by-side analysis of the 5 standardized techniques:
  - **Open Lichtenstein** (Gold Standard Anterior Mesh)
  - **Laparoscopic TEP** (Totally Extra-Peritoneal)
  - **Laparoscopic TAPP** (Trans-Abdominal Pre-Peritoneal)
  - **Open Shouldice** (Gold Standard Non-Mesh Tissue Repair)
  - **Pediatric Herniotomy** (High Sac Ligation)
- Compares dissection plane, anesthesia options, CPIP chronic pain rate, recurrence rate, convalescence timeline, bilateral suitability, female suitability, scrotal hernia suitability, post-prostatectomy safety, learning curve, equipment cost, and guideline recommendations.

### 3. Guidelines & Consensus Tables Browser
- Full interactive digital representation of **Table 1**, **Table 2**, and **Table 3**.
- Visual reference for the **European Hernia Society (EHS) Groin Hernia Classification**.
- Summary of the **EAES 2026 Protocol** (Key Questions, GRADE methodology, and subgroup assumptions).
- Summary of **HerniaSurge Core Recommendations**.

### 4. Clinical Case Simulator (8 Vignettes)
One-click pre-loaded cases to test the algorithm on common and complex scenarios:
1. *32-Year-Old Marathon Runner with Bilateral Groin Bulges* (Lap TEP/TAPP priority)
2. *79-Year-Old Male with Severe COPD & Cardiac Disease* (Open Lichtenstein under Local Infiltration)
3. *44-Year-Old Female with Groin Pain & Femoral Hernia* (Lap posterior repair mandatory)
4. *56-Year-Old Male with Recurrence 4 Years After Lichtenstein* (Opposite Plane Rule: Laparoscopic)
5. *67-Year-Old Male Post-Radical Robotic Prostatectomy* (Avoid TEP; Open Lichtenstein or TAPP)
6. *61-Year-Old Male with Acute Strangulated Inguinal Hernia* (Emergency Open exploration; Shouldice if contaminated)
7. *36-Year-Old Construction Worker Refusing Synthetic Mesh* (Open Shouldice 4-layer repair)
8. *5-Year-Old Child with Congenital Indirect Hernia* (Pediatric Herniotomy without mesh)

### 5. Source PDF Document Viewer
- In-app embedded viewer and direct download links for the three provided PDF guideline documents:
  - `TABLE_1_1__1__9e1397ef.pdf`
  - `EAES_clinical_practice_guidelines_2026_7606ffca.pdf`
  - `Groin_ENG_cov13178_ehs_groin_hernia_management_a5_en_10_lr_1_b05a57f7.pdf`

### 6. Surgical Consultation Sheet (Print & Copy)
- Generate clean, formatted pre-operative consultation summaries suitable for electronic medical records (EMR/EHR) and informed consent documentation. Supports native printing (`window.print()`) and one-click clipboard copying.

---

## Technical Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Build**: Vite
- **Styling**: Tailwind CSS v4 with custom dark mode variant (`@custom-variant dark`)
- **Typography**: Plus Jakarta Sans (interface) & JetBrains Mono (data/metrics)
- **Icons**: Lucide React
- **Animations & Transitions**: Motion

---

## Project Structure

```
├── index.html                     # HTML entry point with fonts & metadata
├── metadata.json                  # AI Studio applet configuration
├── package.json                   # Dependencies and scripts
├── public/
│   └── assets/
│       └── aistudio/              # Source guideline PDF attachments
│           ├── TABLE_1_1__1__9e1397ef.pdf
│           ├── EAES_clinical_practice_guidelines_2026_7606ffca.pdf
│           └── Groin_ENG_cov13178_ehs_groin_hernia_management_a5_en_10_lr_1_b05a57f7.pdf
├── src/
│   ├── App.tsx                    # Main application shell with tab state & theme
│   ├── index.css                  # Tailwind CSS v4 & custom layers
│   ├── main.tsx                   # React root mount
│   ├── components/
│   │   ├── Header.tsx             # Standardized 3-zone navigation bar
│   │   ├── CalculatorTab.tsx      # Dual-column interactive decision calculator
│   │   ├── ComparisonMatrixTab.tsx# Side-by-side procedure comparison table
│   │   ├── GuidelinesMatrixTab.tsx# Tables 1, 2, 3, EHS, EAES, & HerniaSurge views
│   │   ├── CaseSimulatorTab.tsx   # 8 clinical vignettes with one-click loading
│   │   ├── SourcePdfsTab.tsx      # Embedded PDF viewer and download interface
│   │   └── PrintReportModal.tsx   # Formatted clinical report & print view
│   ├── data/
│   │   ├── caseStudies.ts         # Pre-configured clinical vignettes
│   │   └── guidelinesData.ts      # Structured guideline tables & metadata
│   ├── types/
│   │   └── hernia.ts              # Core clinical data models and interfaces
│   └── utils/
│       └── decisionEngine.ts      # Algorithmic decision logic & BMI calculations
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Launch development server on port 3000
npm run dev
```

### Production Build

```bash
# Compile and bundle the application
npm run build
```

### Type Checking & Linting

```bash
# Run TypeScript compilation check
npm run lint
```

---

## Disclaimer

This application is an educational and clinical decision-support tool synthesized from peer-reviewed surgical guidelines (HerniaSurge 2018/2023, EAES 2026, EHS). It is designed to assist qualified healthcare professionals in pre-operative planning and shared decision-making. Final surgical management must always be individualized to the patient's specific anatomy, clinical condition, surgeon expertise, and local institutional resources.
