export type ContraventionCode = {
  code: string;
  title: string;
  description: string;
  wardenNote: string;
  commonMistakes: string[];
  yourRights: string;
  fineAmount: { band: string; reduced: number; full: number };
  difficulty: "Easy" | "Moderate" | "Hard";
  tags: string[];
};

export const CODES: ContraventionCode[] = [
  {
    code: "01",
    title: "Parked in a restricted street during prescribed hours",
    description:
      "You parked on a single or double yellow line during the hours of operation.",
    wardenNote:
      "The most common code issued. Time plates must be present, legible and correct. If kerb marks are present on a bank holiday or Sunday, check local council orders — many yellow lines don't operate on those days.",
    commonMistakes: [
      "No time plate visible within 50 metres",
      "Time plate obscured or damaged",
      "Kerb marks present but no controlled hours apply",
      "Bank holiday exemption applies",
      "Lines faded beyond recognition",
    ],
    yourRights:
      "You have the right to see the council's Traffic Regulation Order (TRO). If the signage doesn't match the TRO, the PCN should be cancelled.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Moderate",
    tags: ["yellow lines", "restricted street", "time plate"],
  },
  {
    code: "02",
    title:
      "Parked or loading/unloading in a restricted street where waiting and loading/unloading restrictions are in force",
    description:
      "You parked in a loading bay or area with loading restrictions (kerb marks/spikes).",
    wardenNote:
      "Loading bays have kerb marks — yellow spikes on the kerb. Blue Badge holders cannot use loading bays unless the council has made a specific exemption. Don't assume exemptions exist.",
    commonMistakes: [
      "Loading bay markings faded",
      "No nearby sign showing hours of operation",
      "Genuine loading activity was taking place",
      "CEO did not observe for sufficient time to confirm no loading",
    ],
    yourRights:
      "If you were actively loading or unloading, and the CEO did not observe for long enough to confirm this wasn't happening, you have grounds to challenge.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Moderate",
    tags: ["loading bay", "kerb marks", "loading restriction"],
  },
  {
    code: "12",
    title:
      "Parked in a residents' or shared use parking place without clearly displaying a valid permit",
    description:
      "You parked in a residents' bay without a valid permit displayed.",
    wardenNote:
      "Permit must be clearly visible through the windscreen. A permit tucked under the seat or face-down is not displayed. Digital permits are council-specific — check if the council uses virtual permits before challenging.",
    commonMistakes: [
      "Permit fallen from dashboard",
      "Wrong zone permit displayed",
      "Permit expired on that date",
      "Digital permit not properly registered",
      "Visitor permit not correctly filled in",
    ],
    yourRights:
      "If your permit was valid but not clearly displayed due to it falling, some councils will accept this as mitigating circumstances, especially for first offences.",
    fineAmount: { band: "Band A Outside London", reduced: 50, full: 100 },
    difficulty: "Hard",
    tags: ["residents permit", "parking permit", "residents bay"],
  },
  {
    code: "16",
    title: "Parked in a permit space without displaying a valid permit",
    description:
      "Parked in a designated permit-only bay with no permit shown at all.",
    wardenNote:
      "Different from code 12 — this is where no permit is displayed whatsoever, not just an invalid one. CEOs are trained to check for virtual permits on council systems before issuing.",
    commonMistakes: [
      "CEO failed to check virtual permit register",
      "Permit purchased but not yet activated",
      "New resident with temporary permission not recorded",
    ],
    yourRights:
      "If you have a valid permit registered digitally, request evidence the CEO checked the virtual permit system before issuing.",
    fineAmount: { band: "Band A Outside London", reduced: 50, full: 100 },
    difficulty: "Moderate",
    tags: ["permit", "permit bay", "no permit"],
  },
  {
    code: "30",
    title: "Parked for longer than permitted",
    description:
      "You exceeded the maximum stay in a limited waiting bay or car park.",
    wardenNote:
      "CEOs must chalk or photograph tyres at the start and return later. If there's no evidence of the first visit (no chalk mark photo, no initial observation time logged), the PCN is on shaky ground.",
    commonMistakes: [
      "No chalk mark or photo evidence of first observation",
      "Gap between observations too short",
      "Return visit time not properly recorded",
      "Clock started incorrectly",
    ],
    yourRights:
      "Request the CEO's observation notes and photos. If the first observation isn't evidenced, challenge on procedural grounds.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Easy",
    tags: ["overstay", "limited waiting", "time limit"],
  },
  {
    code: "40",
    title:
      "Parked in a designated disabled person's parking place without displaying a valid disabled person's badge",
    description:
      "Parked in a Blue Badge bay without a valid Blue Badge displayed.",
    wardenNote:
      "Blue Badge must be displayed face up on the dashboard with the clock set or expiry date visible. CEOs are trained to check expiry dates carefully. A badge belonging to someone not in the vehicle is fraud — not a valid appeal ground.",
    commonMistakes: [
      "Badge face down or not visible",
      "Badge expired",
      "Clock not set to arrival time",
      "Badge belongs to passenger not present",
    ],
    yourRights:
      "If the badge was valid and properly displayed but the CEO missed it, provide photographic evidence if you have it.",
    fineAmount: { band: "Band A Outside London", reduced: 50, full: 100 },
    difficulty: "Hard",
    tags: ["blue badge", "disabled bay", "disabled parking"],
  },
  {
    code: "45",
    title: "Parked in a loading place during restricted hours without loading",
    description:
      "Parked in an on-street loading bay during its hours of operation without actively loading.",
    wardenNote:
      "This is where observation time matters most. A CEO must observe for a reasonable period — typically 5 minutes — before issuing for no loading activity. If they issued within 2 minutes of arrival, challenge it.",
    commonMistakes: [
      "Insufficient observation time before issuing",
      "Genuine loading was taking place",
      "Restricted hours not clearly signed",
      "Loading bay markings unclear",
    ],
    yourRights:
      "CEOs should allow reasonable time to establish loading isn't taking place. Ask for the CEO's observation log — if observation was under 5 minutes, challenge.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Easy",
    tags: ["loading bay", "no loading", "observation time"],
  },
  {
    code: "62",
    title:
      "Parked with one or more wheels on or over a footway, cycle track or verge",
    description:
      "You parked with at least one wheel on the pavement, a cycle path, or grass verge.",
    wardenNote:
      "This is a strict liability offence in most areas. Even partially on the pavement counts. London has a blanket pavement parking ban. Outside London, rules vary — some councils have specific bays that allow it.",
    commonMistakes: [
      "No clear marking or sign prohibiting pavement parking in that specific location (outside London)",
      "Verge is not publicly maintained",
      "Emergency access necessity",
    ],
    yourRights:
      "Outside London, check whether your council has a specific TRO in place for that road. Without one, this code may not apply.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Hard",
    tags: ["pavement parking", "footway", "wheel on kerb"],
  },
  {
    code: "74",
    title:
      "Using a vehicle in a parking place in connection with the sale or offering or exposing for sale of goods when prohibited",
    description: "Using a parking space to sell goods from your vehicle.",
    wardenNote:
      "Rare code. Usually applies to market areas or specific controlled zones. Evidence requirement is high — CEOs need to witness the selling activity.",
    commonMistakes: [
      "No clear prohibition signage in that bay",
      "Activity was not selling (e.g. giving away)",
      "CEO did not witness actual transaction",
    ],
    yourRights:
      "Challenge if signage wasn't clear or if the CEO cannot evidence they witnessed actual selling activity.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Easy",
    tags: ["selling from vehicle", "market", "trade"],
  },
  {
    code: "86",
    title: "Parked beyond the bay markings",
    description:
      "Your vehicle extended beyond the marked lines of a parking bay.",
    wardenNote:
      "CEOs photograph this from a specific angle. If the bay markings are worn or unclear, challenge on signage grounds. Also check whether the bay was actually big enough for a standard vehicle — some older bays predate modern car sizes.",
    commonMistakes: [
      "Bay markings faded or unclear",
      "Bay too small for standard vehicle",
      "Photo taken at misleading angle",
      "Wheel just touching the line (not over it)",
    ],
    yourRights:
      "Request the CEO's photographs. If markings are worn, this is a valid challenge. The vehicle must be clearly and unambiguously beyond the bay.",
    fineAmount: { band: "Band B Outside London", reduced: 25, full: 50 },
    difficulty: "Easy",
    tags: ["bay markings", "overhang", "parking bay"],
  },
];

/** Normalise URL param e.g. "1" → "01", invalid → null */
export function normalizeContraventionCodeParam(param: string): string | null {
  const t = param.trim();
  if (!/^\d{1,2}$/.test(t)) return null;
  const n = parseInt(t, 10);
  if (n < 1 || n > 99) return null;
  return n.toString().padStart(2, "0");
}

export function getContraventionByCodeParam(
  param: string,
): ContraventionCode | undefined {
  const norm = normalizeContraventionCodeParam(param);
  if (!norm) return undefined;
  return CODES.find((c) => c.code === norm);
}
