export type FineAmount = {
  bandDescription: string;
  outsideLondon: { reduced: number; full: number };
  londonBandA: { reduced: number; full: number } | null;
  londonBandB: { reduced: number; full: number } | null;
  note: string;
};

const FINE_NOTE =
  "Fine amounts are set by your issuing council and may differ. Always check the amount stated on your actual PCN.";

const LONDON_BAND_A = { reduced: 65, full: 130 };
const LONDON_BAND_B = { reduced: 50, full: 100 };

/** Band A (higher): outside London £50 / £100; London £65 / £130 */
function fineAmountBandA(): FineAmount {
  return {
    bandDescription:
      "This contravention is typically enforced at Band A (higher level).",
    outsideLondon: { reduced: 50, full: 100 },
    londonBandA: LONDON_BAND_A,
    londonBandB: LONDON_BAND_B,
    note: FINE_NOTE,
  };
}

/** Band B (lower): outside London £25 / £50; London £50 / £100 */
function fineAmountBandB(): FineAmount {
  return {
    bandDescription:
      "This contravention is typically enforced at Band B (lower level).",
    outsideLondon: { reduced: 25, full: 50 },
    londonBandA: LONDON_BAND_A,
    londonBandB: LONDON_BAND_B,
    note: FINE_NOTE,
  };
}

export type ContraventionCode = {
  code: string;
  title: string;
  description: string;
  wardenNote: string;
  commonMistakes: string[];
  yourRights: string;
  fineAmount: FineAmount;
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
    fineAmount: fineAmountBandB(),
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
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["loading bay", "kerb marks", "loading restriction"],
  },
  {
    code: "04",
    title: "Parked in a meter bay when penalty time is indicated",
    description:
      "Parked in a parking meter bay while the meter is showing penalty time — meaning a previous motorist overstayed and the meter has not been reset.",
    wardenNote:
      "Less common now with pay by phone replacing meters, but still exists. The meter must clearly show penalty time. CEOs should photograph the meter display.",
    commonMistakes: [
      "Meter display unclear or faulty",
      "Motorist unaware meter was already in penalty",
      "CEO did not photograph meter display",
    ],
    yourRights:
      "If the meter display was unclear or you attempted to pay but couldn't, challenge and explain the circumstances.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["meter", "penalty time", "parking meter"],
  },
  {
    code: "05",
    title: "Parked after the expiry of paid for time",
    description:
      "You stayed beyond the time you paid for in a pay and display or pay by phone bay.",
    wardenNote:
      "CEOs photograph the ticket or check pay by phone records. If you returned just after expiry, some councils allow a grace period — typically 10 minutes. This is not a legal requirement but many councils apply it.",
    commonMistakes: [
      "Returned just after expiry (grace period may apply)",
      "Pay by phone extension failed",
      "Ticket machine would not accept further payment",
      "Clock discrepancy between meter and CEO device",
    ],
    yourRights:
      "Ask whether your council applies the 10-minute grace period. If you returned within 10 minutes of expiry, this is worth challenging.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["expired ticket", "overstay", "pay and display"],
  },
  {
    code: "06",
    title:
      "Parked without clearly displaying a valid pay and display ticket or voucher",
    description:
      "A valid ticket was purchased but was not clearly visible through the windscreen.",
    wardenNote:
      "Payment was made but the ticket wasn't visible. CEOs are required to check thoroughly before issuing. If the ticket was valid but had slipped, provide a photo of the ticket with the timestamp and challenge.",
    commonMistakes: [
      "Ticket fell off dashboard",
      "Ticket face-down or obscured",
      "CEO did not check thoroughly before issuing",
      "Voucher not correctly displayed",
    ],
    yourRights:
      "If you have the valid ticket, photograph it immediately and submit with your appeal. Many councils cancel these on first appeal.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["pay and display", "ticket not displayed", "valid ticket"],
  },
  {
    code: "07",
    title:
      "Parked with payment made to extend the stay beyond initial time (meter feeding)",
    description:
      "You paid to extend your stay in a bay that prohibits returning to pay for more time — known as meter feeding.",
    wardenNote:
      "No-return and no-extension rules keep spaces turning over. Signs must clearly prohibit extending. CEOs check payment records. If the sign wasn't clear, challenge.",
    commonMistakes: [
      "Prohibition not clearly signed",
      "Pay by phone extension confused with permitted return",
      "CEO has no evidence of initial payment period",
    ],
    yourRights:
      "The prohibition on extending must be clearly signed. If it wasn't, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["meter feeding", "extending stay", "no return"],
  },
  {
    code: "08",
    title: "Parked at an out-of-order meter during controlled hours",
    description:
      "Parked in a meter bay during controlled hours while the meter was out of order.",
    wardenNote:
      "If a meter is out of order, the council should provide alternative payment methods or suspend the bay. If neither was done, this is strong grounds to challenge. Always photograph out-of-order meters immediately.",
    commonMistakes: [
      "No alternative payment method provided",
      "Bay not suspended despite broken meter",
      "No out-of-order notice on meter",
    ],
    yourRights:
      "If the meter was broken with no alternative payment option, the PCN should be cancelled. Photograph the broken meter.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["broken meter", "out of order", "meter fault"],
  },
  {
    code: "09",
    title:
      "Parked displaying multiple pay and display tickets where prohibited",
    description:
      "You displayed more than one pay and display ticket in an area where this is prohibited — usually to extend a stay beyond a single ticket's maximum.",
    wardenNote:
      "Some councils prohibit buying multiple tickets to extend a stay. The prohibition must be clearly signed. Rarely enforced but valid where signage is clear.",
    commonMistakes: [
      "Prohibition not clearly signed",
      "Two tickets purchased for different bays",
      "Genuine mistake",
    ],
    yourRights:
      "Check the signs. If the prohibition on multiple tickets wasn't displayed, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["multiple tickets", "pay and display", "extending stay"],
  },
  {
    code: "10",
    title:
      "Parked without clearly displaying two valid pay and display tickets when required",
    description:
      "In some locations two pay and display tickets are required — e.g. to occupy two bays. Only one or none were displayed.",
    wardenNote:
      "Very rare. Only applies where council has a specific requirement for two tickets. Must be clearly signed.",
    commonMistakes: [
      "Requirement not clearly signed",
      "Second ticket fell from display",
      "Driver unaware of two-ticket requirement",
    ],
    yourRights:
      "If the two-ticket requirement wasn't clearly signed, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["two tickets", "pay and display", "dual ticket"],
  },
  {
    code: "11",
    title: "Parked without payment of the parking charge",
    description:
      "Parked in a pay to park location without making any payment — typically used for pay by phone or cashless bays where there is nothing physical to display.",
    wardenNote:
      "Used where there is no physical ticket to display — purely cashless or pay by phone bays. CEOs check the payment system in real time. If your payment went through, the evidence is in the system.",
    commonMistakes: [
      "Pay by phone session failed silently",
      "Wrong vehicle registration entered",
      "Wrong zone or bay reference used",
      "App or network failure",
    ],
    yourRights:
      "If you attempted to pay and the system failed, get evidence from your app immediately (screenshot, email confirmation). Challenge with this evidence.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["no payment", "cashless", "pay by phone"],
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
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["residents permit", "parking permit", "residents bay"],
  },
  {
    code: "14",
    title:
      "Parked in an electric vehicles charging place during restricted hours without charging",
    description:
      "Parked in an EV charging bay without actively charging your vehicle.",
    wardenNote:
      "Growth area for enforcement. The vehicle must be actively connected and charging. Simply being an electric vehicle does not entitle you to park there without charging. CEOs check for charging cable connection.",
    commonMistakes: [
      "Charging session ended but vehicle remained",
      "Cable connected but charging not initiated",
      "Charger fault preventing charging",
      "Restricted hours not clearly signed",
    ],
    yourRights:
      "If the charger was faulty and you can evidence this (photo of error message), the council should cancel the PCN.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["EV charging", "electric vehicle", "charging bay"],
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
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["permit", "permit bay", "no permit"],
  },
  {
    code: "18",
    title:
      "Using a vehicle in a parking place in connection with the sale or exposing for sale of goods when prohibited (on-street)",
    description:
      "Using an on-street parking place to sell or display goods for sale when this is prohibited.",
    wardenNote:
      "Same principle as off-street code 74. Evidence requirement is high — the CEO must witness actual selling activity or clear display of goods for sale. Prohibition must be signed.",
    commonMistakes: [
      "No prohibition sign present",
      "Activity was not commercial selling",
      "CEO did not witness actual transaction or display",
    ],
    yourRights:
      "Challenge if the prohibition wasn't signed or if the CEO cannot evidence they witnessed selling activity.",
    fineAmount: fineAmountBandA(),
    difficulty: "Easy",
    tags: ["selling from vehicle", "goods for sale", "street trading"],
  },
  {
    code: "19",
    title:
      "Parked in a residents' or shared use parking place or zone displaying an invalid permit",
    description:
      "A permit was displayed in a residents bay but it was invalid — wrong zone, expired, or not applicable.",
    wardenNote:
      "Zone boundaries catch many drivers out. Zone A and Zone B can be adjacent streets. Always check which zone your bay is in before assuming your permit covers it.",
    commonMistakes: [
      "Wrong zone permit displayed",
      "Permit expired on that date",
      "Shared use bay — permit valid but parking outside permitted hours",
      "Permit for different council area",
    ],
    yourRights:
      "Check the bay markings and signs carefully. If the zone designation on the sign is unclear or missing, challenge on signage grounds.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["residents permit", "wrong zone", "invalid permit"],
  },
  {
    code: "20",
    title:
      "Parked in a part of a parking place marked by a yellow line where waiting is prohibited",
    description:
      "Parked within a parking place but on a yellow line marking that prohibits waiting within that area.",
    wardenNote:
      "Yellow lines within parking areas indicate internal no-waiting zones. These must be clearly marked. If the line was faded or there was no clear sign, challenge.",
    commonMistakes: [
      "Internal yellow line not clearly visible",
      "Driver unaware yellow lines can exist within parking areas",
      "No sign explaining the internal restriction",
    ],
    yourRights:
      "The yellow line must be clear and accompanied by appropriate signage. Faded markings are challengeable.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["yellow line", "internal restriction", "parking place"],
  },
  {
    code: "21",
    title: "Parked in a suspended bay or space",
    description:
      "Parked in a bay that had been temporarily suspended, usually for works, events, or utility access.",
    wardenNote:
      "Suspension notices must be placed in advance — typically 24 hours minimum. If the notice was not properly displayed or was placed with insufficient notice, the PCN should be challenged. Always photograph the suspension notice.",
    commonMistakes: [
      "Suspension notice placed with less than 24 hours notice",
      "Notice not visible from where vehicle was parked",
      "Suspension period already ended",
      "Wrong bay or street identified on notice",
    ],
    yourRights:
      "Councils must give adequate advance notice of suspensions. If the notice appeared the same day or was inadequately placed, challenge the PCN.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["suspended bay", "bay suspension", "temporary suspension"],
  },
  {
    code: "22",
    title:
      "Re-parked in the same parking place or zone within one hour of leaving",
    description:
      "You returned to the same restricted parking area within the no-return period.",
    wardenNote:
      "CEOs note departure times. No-return periods are typically 1 hour but vary. The period runs from when you left, not when your original ticket expired. Some areas have 2-hour no-return periods — check the signs.",
    commonMistakes: [
      "No-return period not clearly signed",
      "Different bay on same street (may still count as same zone)",
      "Return period misunderstood",
      "CEO recorded wrong departure time",
    ],
    yourRights:
      "Check the signs carefully for the no-return period. If it wasn't signed, or you parked in a genuinely different zone, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["no return", "re-parked", "same zone"],
  },
  {
    code: "23",
    title:
      "Parked in a parking place or area not designated for that class of vehicle",
    description:
      "Parked in a bay restricted to a specific type of vehicle, such as motorcycles only, coaches only, or loading vehicles.",
    wardenNote:
      "Common with motorcycle bays and coach bays. The bay markings and signs must clearly state the restriction. If it was not obvious the bay was restricted to a specific class, challenge on signage.",
    commonMistakes: [
      "Signage not clear",
      "Bay markings faded",
      "Motorcycle bay used by car",
      "Coach bay used outside restricted hours",
    ],
    yourRights:
      "The restriction must be clearly signed and marked. If a reasonable driver could not have known, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["wrong vehicle class", "motorcycle bay", "coach bay"],
  },
  {
    code: "24",
    title: "Not parked correctly within the markings of a parking bay or space",
    description:
      "Parked at an angle or position that does not conform to the bay markings.",
    wardenNote:
      "Similar to code 86 but applies inside bays rather than overhanging them. CEOs photograph from a standard angle. If bay markings are faded, challenge. Also check if adjacent vehicles pushed your position.",
    commonMistakes: [
      "Bay markings faded",
      "Tight bay with adjacent vehicles",
      "Angled bay not clearly marked",
      "Photo angle misleading",
    ],
    yourRights:
      "Request CEO photographs. Faded or unclear markings are a valid challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["bay markings", "parking position", "not within bay"],
  },
  {
    code: "25",
    title: "Parked in a loading place or bay during restricted hours",
    description:
      "Parked in a loading bay during its restricted hours without loading — on-street loading bays can use several related sign types.",
    wardenNote:
      "Check the signs carefully — loading bays and loading areas have different sign types. Hours must be clearly displayed. If the sign is damaged, obscured, or missing, challenge immediately.",
    commonMistakes: [
      "Hours not clearly signed",
      "Sign damaged or obscured",
      "Genuine loading taking place",
      "Outside restricted hours",
    ],
    yourRights:
      "If you were loading, the CEO should have observed for a reasonable period. If the signage was defective, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["loading bay", "loading place", "restricted hours"],
  },
  {
    code: "26",
    title:
      "Parked in a special enforcement area adjacent to a dropped footway",
    description:
      "Parked across or adjacent to a dropped kerb (crossover) in a special enforcement area.",
    wardenNote:
      "Dropped kerbs protect driveway access. In special enforcement areas, parking here is a civil offence even without yellow lines. The dropped kerb must be a proper vehicle crossover, not just a lowered kerb for pedestrians.",
    commonMistakes: [
      "Pedestrian dropped kerb mistaken for vehicle crossover",
      "Partly blocking rather than fully blocking",
      "Own driveway crossover (you can park across your own in some areas)",
    ],
    yourRights:
      "If the dropped kerb is for pedestrian use only, not a vehicle crossover, challenge. Also check if it's your own driveway — rules differ.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["dropped kerb", "crossover", "driveway"],
  },
  {
    code: "27",
    title:
      "Parked in a special enforcement area on a verge, footway or central reservation",
    description:
      "Parked on a pavement, grass verge, or central reservation in a special enforcement area.",
    wardenNote:
      "Similar to code 62 but applies specifically in designated special enforcement areas. Outside these areas, code 62 applies. London operates a near-blanket ban.",
    commonMistakes: [
      "Area not designated as special enforcement area",
      "Verge is private land",
      "Emergency necessity",
    ],
    yourRights:
      "Check whether the specific location is within a designated special enforcement area. If not, challenge the code used.",
    fineAmount: fineAmountBandB(),
    difficulty: "Hard",
    tags: ["footway", "verge", "special enforcement area"],
  },
  {
    code: "28",
    title:
      "Parked in a special enforcement area more than 50 centimetres from the edge of the carriageway",
    description:
      "Parked too far from the kerb — more than 50cm away from the edge of the road.",
    wardenNote:
      "Rarely issued alone — usually accompanies another contravention. The 50cm measurement must be evidenced. CEOs should photograph and measure. If no measurement evidence exists, challenge.",
    commonMistakes: [
      "No measurement evidence from CEO",
      "Road camber or obstruction caused the gap",
      "Parked on a curve where kerb measurement is unclear",
    ],
    yourRights:
      "Ask for the CEO's evidence of the measurement. Without it, the contravention cannot be proven.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["50cm rule", "kerb distance", "special enforcement area"],
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
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["overstay", "limited waiting", "time limit"],
  },
  {
    code: "35",
    title:
      "Parked in a disc parking place without clearly displaying a valid disc",
    description:
      "Parked in a disc parking zone without displaying a properly set parking disc.",
    wardenNote:
      "Disc parking is less common now but still exists in some areas. The disc must show arrival time. CEOs check whether the disc is correctly set and whether the permitted time has expired.",
    commonMistakes: [
      "Disc not set to arrival time",
      "Disc face-down or not visible",
      "Disc expired",
      "Area no longer disc zone but old signs remain",
    ],
    yourRights:
      "If disc markings or signs are outdated or unclear, challenge on signage grounds.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["disc parking", "parking disc", "arrival time"],
  },
  {
    code: "36",
    title: "Parked in a disc parking place for longer than permitted",
    description:
      "Your disc showed you had exceeded the permitted parking time in a disc zone.",
    wardenNote:
      "The disc itself is the evidence. If the disc was correctly set and you were within time, photograph it immediately. If the CEO misread the disc, that is grounds to challenge.",
    commonMistakes: [
      "CEO misread the disc time",
      "Disc moved by vibration",
      "Time period misunderstood",
    ],
    yourRights:
      "If the disc was correctly set, provide a photo. If the CEO's record of the disc time differs from your disc, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["disc parking", "overstay", "disc zone"],
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
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["blue badge", "disabled bay", "disabled parking"],
  },
  {
    code: "41",
    title: "Stopped in a parking place designated for diplomatic vehicles",
    description:
      "Parked in a bay reserved exclusively for diplomatic vehicles.",
    wardenNote:
      "Diplomatic bays are clearly marked. Very little grounds for challenge unless the signage was defective.",
    commonMistakes: [
      "Sign obscured or damaged",
      "Bay markings faded",
      "Unaware of restriction",
    ],
    yourRights:
      "Check signage. Defective or obscured signs are the main challenge grounds.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["diplomatic bay", "reserved bay", "diplomatic vehicle"],
  },
  {
    code: "42",
    title: "Parked in a parking place designated for police vehicles",
    description: "Parked in a bay reserved for police vehicles.",
    wardenNote:
      "Police bays are clearly marked near police stations and courts. Defective signage is the main challenge ground.",
    commonMistakes: ["Sign obscured", "Bay markings unclear"],
    yourRights: "Check signage is clear and correct.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["police bay", "reserved bay"],
  },
  {
    code: "43",
    title: "Stopped on a cycle docking station parking place",
    description:
      "Parked in a docking station bay designated for hire cycles such as Santander Cycles.",
    wardenNote:
      "Cycle docking bays are clearly marked with yellow markings and signs. Common in London. Very little grounds for challenge unless signage defective.",
    commonMistakes: ["Bay markings unclear", "Sign obscured"],
    yourRights:
      "Defective signage is the main challenge ground.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["cycle docking", "hire bike", "docking station"],
  },
  {
    code: "45",
    title: "Stopped on a taxi rank",
    description:
      "Your vehicle stopped or parked on a designated taxi rank.",
    wardenNote:
      "Taxi ranks are no-stopping zones for all vehicles except licensed taxis. Even briefly stopping to drop someone off is not permitted. These are often camera enforced. Check whether a rank is operational 24/7 or has restricted hours — signs must clearly show the hours.",
    commonMistakes: [
      "Rank not clearly signed or marked",
      "Hours of operation not displayed",
      "Brief drop-off assumed to be permitted",
      "Rank temporarily suspended but suspension not signed",
    ],
    yourRights:
      "Check the signs. If hours aren't displayed or markings are faded, challenge. If the rank was suspended, challenge.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["taxi rank", "no stopping", "cab rank"],
  },
  {
    code: "46",
    title: "Stopped where prohibited on a red route or clearway",
    description:
      "Stopped on a red route or clearway where stopping is strictly prohibited at that time.",
    wardenNote:
      "Red routes are the most strictly enforced routes in the country, primarily in London. No stopping means no stopping — not even briefly for a delivery. Double red lines mean no stopping at any time. Single red lines have restricted hours shown on signs.",
    commonMistakes: [
      "Hours of operation not checked",
      "Brief stop assumed permissible",
      "Loading exemption assumed but doesn't apply on red routes",
      "Sign obscured",
    ],
    yourRights:
      "Check the hours on the signs carefully. Double reds operate 24/7. Single reds have hours — if the sign was unclear, challenge.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["red route", "clearway", "no stopping"],
  },
  {
    code: "47",
    title: "Stopped on a restricted bus stop or stand",
    description:
      "Stopped on a road marking designated as a bus stop or bus stand during its restricted hours.",
    wardenNote:
      "Bus stops have yellow zigzag markings and signs. Restricted bus stops prohibit all stopping except buses. Hours must be displayed — if no hours sign, the restriction may operate at all times. Even a brief stop counts.",
    commonMistakes: [
      "No hours sign (restriction may still apply at all times)",
      "Brief stop to drop off assumed permitted",
      "Markings faded",
      "Sign obscured",
    ],
    yourRights:
      "Check for an hours sign. If no hours are shown and markings are clear, the restriction likely applies at all times. Faded markings are challengeable.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["bus stop", "bus stand", "restricted bus stop"],
  },
  {
    code: "48",
    title:
      "Stopped in a restricted area outside a school, hospital or fire, police or ambulance station when prohibited",
    description:
      "Stopped on school keep-clear markings or outside a hospital, fire, police or ambulance station during restricted hours.",
    wardenNote:
      "School keep-clears have zigzag markings and signs. Times are shown on signs — often term-time only. Hospitals and emergency services have their own restricted areas. These are safety-critical restrictions — adjudicators take them seriously.",
    commonMistakes: [
      "Term-time only restriction — not in term time",
      "Restricted hours not in force at time of PCN",
      "Sign obscured",
      "Brief stop assumed permissible",
    ],
    yourRights:
      "Check whether the restriction was in force at the time. School keep-clears are often term-time only — if it was a school holiday, challenge.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["school keep clear", "hospital", "emergency services", "zigzag"],
  },
  {
    code: "49",
    title: "Parked wholly or partly on a cycle track or lane",
    description:
      "Parked with any part of the vehicle on a designated cycle track or mandatory cycle lane.",
    wardenNote:
      "Cycle lanes must be marked with a solid or broken white line and appropriate signs. Mandatory cycle lanes (solid white line) cannot be entered by other vehicles. Advisory lanes (broken line) are advisory only and may not be enforceable in the same way.",
    commonMistakes: [
      "Advisory cycle lane mistaken for mandatory",
      "Lane markings unclear or faded",
      "Temporary suspension of restriction not enforced",
    ],
    yourRights:
      "Check whether the cycle lane is mandatory (solid line) or advisory (broken line). Advisory lanes may not support this code.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["cycle lane", "cycle track", "bicycle lane"],
  },
  {
    code: "55",
    title:
      "A commercial vehicle parked in a restricted street in contravention of the Overnight Waiting Ban",
    description:
      "A commercial vehicle (typically over 5 tonnes) parked on a restricted street overnight in breach of an overnight waiting ban.",
    wardenNote:
      "Overnight bans on heavy commercial vehicles are common in residential areas. Hours are specified on signs. The vehicle type matters — check whether your vehicle meets the weight threshold specified.",
    commonMistakes: [
      "Vehicle below the weight threshold for the ban",
      "Hours not correctly checked",
      "Sign not present or obscured",
      "Loading exemption incorrectly assumed",
    ],
    yourRights:
      "Check the weight threshold on the sign. If your vehicle is below it, challenge. Check the hours carefully.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["commercial vehicle", "overnight ban", "HGV", "lorry"],
  },
  {
    code: "56",
    title:
      "Parked in contravention of a commercial vehicle waiting restriction",
    description:
      "A commercial vehicle parked where commercial vehicles are prohibited from waiting.",
    wardenNote:
      "Commercial vehicle restrictions are signed. Check the weight threshold and hours. These are separate from general parking restrictions.",
    commonMistakes: [
      "Vehicle below threshold",
      "Hours not in force",
      "Sign obscured or missing",
    ],
    yourRights:
      "Challenge on vehicle weight, hours, or signage grounds as appropriate.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["commercial vehicle", "waiting restriction", "lorry"],
  },
  {
    code: "57",
    title: "Parked in contravention of a bus ban",
    description:
      "A bus parked in a location where buses are banned from waiting.",
    wardenNote:
      "Specific to buses. Rare in practice. Restriction must be clearly signed.",
    commonMistakes: ["Restriction not clearly signed", "Hours not in force"],
    yourRights: "Check signage and hours.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["bus ban", "bus waiting", "bus restriction"],
  },
  {
    code: "61",
    title:
      "A heavy commercial vehicle wholly or partly parked on a footway, verge or land between two carriageways",
    description:
      "A heavy commercial vehicle (over 7.5 tonnes) parked with any part of the vehicle on a pavement, grass verge, or central reservation.",
    wardenNote:
      "This applies specifically to HGVs over 7.5 tonnes. The exemption for loading is stricter than for ordinary vehicles — it must be necessary to leave the carriageway and the vehicle must not be unattended. Regular code 62 applies to lighter vehicles.",
    commonMistakes: [
      "Vehicle under 7.5 tonnes (use code 62 instead)",
      "Necessary loading exemption applies",
      "Private land",
    ],
    yourRights:
      "Check vehicle weight. If under 7.5 tonnes, code 61 is the wrong code — challenge on that basis.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["HGV", "heavy goods vehicle", "footway", "verge"],
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
    fineAmount: fineAmountBandB(),
    difficulty: "Hard",
    tags: ["pavement parking", "footway", "wheel on kerb"],
  },
  {
    code: "63",
    title: "Parked with engine running where prohibited (on-street)",
    description:
      "Left the engine running in a location where idling is prohibited.",
    wardenNote:
      "Anti-idling enforcement is growing. CEOs must observe the engine running and warn the driver first before issuing. If no warning was given, challenge. The prohibition must be signed.",
    commonMistakes: [
      "No warning given before PCN issued",
      "Prohibition not clearly signed",
      "Engine running for safety reasons (e.g. disabled passenger)",
    ],
    yourRights:
      "A warning must be given first. If no warning was issued, challenge immediately.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["idling", "engine running", "anti-idling"],
  },
  {
    code: "70",
    title:
      "Parked in a loading place or bay during restricted hours without loading (off-street)",
    description:
      "Parked in a loading bay within a council-operated car park or off-street location during restricted hours without loading.",
    wardenNote:
      "Same principles as on-street loading bays. Observation time applies. Car park loading bays are often poorly signed — check whether hours are clearly posted.",
    commonMistakes: [
      "Insufficient CEO observation time",
      "Hours not clearly signed within car park",
      "Genuine loading activity taking place",
    ],
    yourRights:
      "Request CEO observation log. If observation was insufficient or hours not signed, challenge.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["car park", "loading bay", "off-street"],
  },
  {
    code: "71",
    title:
      "Parked in an electric vehicles charging place during restricted hours without charging (off-street)",
    description:
      "Parked in an EV charging bay in a council car park without actively charging.",
    wardenNote:
      "Same as on-street code 14 but in a car park. Vehicle must be actively charging. A faulty charger with evidence is grounds to challenge.",
    commonMistakes: [
      "Charging session ended",
      "Charger fault",
      "Hours not signed",
    ],
    yourRights:
      "Photograph charger fault messages immediately. Challenge if charger was defective.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["car park", "EV charging", "electric vehicle"],
  },
  {
    code: "72",
    title:
      "Parked after the expiry of paid for time in an off-street car park",
    description:
      "Remained in a council car park beyond the time you paid for.",
    wardenNote:
      "Grace period applies in car parks too — typically 10 minutes after ticket expiry, though this varies. Some car parks use ANPR systems that automatically calculate overstay.",
    commonMistakes: [
      "Returned just after expiry",
      "ANPR time calculation error",
      "Pay by phone extension failed",
      "Ticket machine would not accept more payment",
    ],
    yourRights:
      "Check if the car park uses ANPR and request the entry/exit time evidence. Grace period may apply.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["car park", "overstay", "expired ticket"],
  },
  {
    code: "73",
    title:
      "Parked in an off-street car park without clearly displaying a valid ticket",
    description:
      "A valid ticket was purchased but not clearly displayed in a council car park.",
    wardenNote:
      "Same principle as code 06. If the ticket was valid but fell or was obscured, provide the ticket as evidence with your appeal.",
    commonMistakes: [
      "Ticket fell from dashboard",
      "Ticket face-down",
      "CEO did not check properly",
    ],
    yourRights:
      "Provide the valid ticket with your appeal. Many councils cancel these on first challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["car park", "ticket not displayed", "off-street"],
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
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["selling from vehicle", "market", "trade"],
  },
  {
    code: "78",
    title: "Parked wholly or partly in a suspended bay or space (off-street)",
    description:
      "Parked in a suspended bay or space within a council car park.",
    wardenNote:
      "Same as on-street code 21 but in a car park. Suspension notices must be clearly posted within the car park in advance.",
    commonMistakes: [
      "Suspension notice not clearly displayed",
      "Insufficient advance notice given",
      "Wrong bay identified on notice",
    ],
    yourRights:
      "Check whether adequate notice was given and whether the suspension notice was clearly visible within the car park.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["car park", "suspended bay", "off-street"],
  },
  {
    code: "80",
    title: "Parked in a restricted area in an off-street car park",
    description:
      "Parked in an area of a council car park where parking is prohibited — such as a fire lane, hatched area, or disabled bay without a badge.",
    wardenNote:
      "Car park restrictions must be clearly signed and marked. Hatched areas and fire lanes should be obvious, but disabled bays in car parks follow the same rules as on-street.",
    commonMistakes: [
      "Markings faded",
      "Restriction not clearly signed within the car park",
      "Temporary restriction not properly notified",
    ],
    yourRights:
      "If the restriction was not clearly marked or signed within the car park, challenge on signage grounds.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["car park", "restricted area", "off-street"],
  },
  {
    code: "81",
    title:
      "Parked in a car park or off-street parking place for longer than permitted",
    description:
      "Exceeded the maximum stay in a council car park that has a time limit.",
    wardenNote:
      "Same principles as on-street overstay (code 30). Evidence of first and second observation should exist. ANPR systems log entry and exit automatically.",
    commonMistakes: [
      "Time limit not clearly signed at entry",
      "ANPR error",
      "No observation evidence for non-ANPR car parks",
    ],
    yourRights:
      "Check entry signage for the time limit. If it wasn't clearly displayed at the entrance, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "overstay", "time limit"],
  },
  {
    code: "82",
    title:
      "Parked in a pay and display car park without clearly displaying a valid ticket or voucher",
    description:
      "Parked in a pay and display car park — ticket purchased but not visible.",
    wardenNote:
      "Identical principle to code 06 but in a car park. Valid ticket, not displayed. Provide the ticket immediately and challenge.",
    commonMistakes: [
      "Ticket fell",
      "Ticket face-down",
      "CEO did not look properly",
    ],
    yourRights:
      "Provide the valid ticket. Most councils cancel on first appeal for this one.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["car park", "pay and display", "ticket not displayed"],
  },
  {
    code: "83",
    title:
      "Parked in a parking place designated for a specific class of vehicle",
    description:
      "Parked in a bay in a car park reserved for a specific vehicle type — such as motorcycles, disabled bays, or parent and child spaces.",
    wardenNote:
      "Parent and child spaces are often not civilly enforceable (depends on whether the council has made a TRO for them). Disabled bays in council car parks are enforceable. Motorcycle bays are enforceable.",
    commonMistakes: [
      "Parent and child space — may not be legally enforceable",
      "Signage not clear",
      "Disabled bay — Blue Badge not displayed",
      "Wrong vehicle class",
    ],
    yourRights:
      "For parent and child spaces specifically — check whether your council has a TRO in place. Without one, the PCN may not be valid.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "parent and child", "disabled bay", "specific class"],
  },
  {
    code: "84",
    title:
      "Parked in an off-street parking place beyond the permitted hours of use of that place",
    description: "Parked in a council car park outside its opening hours.",
    wardenNote:
      "Car park opening hours must be clearly posted at the entrance. If the signage was unclear or you were locked in due to early closure, these are grounds to challenge.",
    commonMistakes: [
      "Hours not clearly signed at entrance",
      "Car park closed early without notice",
      "Seasonal hours change not publicised",
    ],
    yourRights:
      "If the car park closed earlier than signed, or hours weren't clearly displayed, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "outside hours", "off-street"],
  },
  {
    code: "85",
    title:
      "Parked in an off-street parking place in breach of any other condition",
    description:
      "A catch-all code for other breaches of car park conditions not covered by specific codes.",
    wardenNote:
      "This is the least specific code. The council must clearly state what condition was breached. If the notice doesn't specify the exact breach, challenge on that basis.",
    commonMistakes: [
      "Condition not clearly stated on PCN",
      "Condition not displayed within the car park",
      "Condition unreasonable or unenforceable",
    ],
    yourRights:
      "The PCN must clearly specify which condition was breached. If it doesn't, challenge. The condition must also have been clearly displayed.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["car park", "conditions", "catch-all"],
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
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["bay markings", "overhang", "parking bay"],
  },
  {
    code: "87",
    title:
      "Parked in an off-street parking place displaying an invalid permit, voucher or ticket",
    description:
      "A permit or ticket was displayed in a council car park but it was invalid.",
    wardenNote:
      "Same principle as on-street. Wrong zone, expired permit, or incorrectly completed voucher. Genuine mistakes on first offence are often cancelled on appeal.",
    commonMistakes: [
      "Wrong zone or car park permit",
      "Permit expired",
      "Voucher incorrectly filled in",
    ],
    yourRights:
      "If it was a genuine mistake, explain clearly. First offence discretion often applies.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "invalid permit", "off-street"],
  },
  {
    code: "89",
    title:
      "Vehicle parked exceeds maximum weight, height or length permitted in a car park",
    description:
      "Your vehicle exceeded a stated weight, height or length restriction for the car park.",
    wardenNote:
      "Height barriers are the most common — if your vehicle passed through the barrier, the height restriction was not exceeded. Weight and length limits must be clearly signed at the entrance.",
    commonMistakes: [
      "Vehicle passed height barrier — cannot have exceeded height limit",
      "Weight or length limit not signed at entrance",
      "Limit posted inside car park only, not at entrance",
    ],
    yourRights:
      "If your vehicle passed through a height barrier, challenge — the barrier is evidence the height limit was not exceeded. Limits must be signed at the entrance.",
    fineAmount: fineAmountBandA(),
    difficulty: "Easy",
    tags: ["car park", "height restriction", "weight limit", "oversize"],
  },
  {
    code: "90",
    title: "Re-parked in the same car park within one hour after leaving",
    description:
      "Returned to the same council car park within the no-return period.",
    wardenNote:
      "No-return periods in car parks must be clearly signed at the entrance. ANPR systems log entry and exit times automatically. Check the signs — some car parks have no no-return rule.",
    commonMistakes: [
      "No-return rule not signed at entrance",
      "ANPR time error",
      "Different section of a large car park",
    ],
    yourRights:
      "If the no-return rule wasn't clearly signed at the entrance, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "no return", "re-parked"],
  },
  {
    code: "92",
    title: "Parked causing an obstruction (off-street)",
    description:
      "Parked in a council car park in a position that causes an obstruction to other vehicles or pedestrians.",
    wardenNote:
      "Obstruction must be evidenced by the CEO. Photos should show the obstruction clearly. This is often issued for vehicles parked across multiple bays or blocking access routes within a car park.",
    commonMistakes: [
      "No clear evidence of obstruction",
      "Obstruction caused by another vehicle",
      "Access route not clearly marked",
    ],
    yourRights:
      "Request CEO photographs. The obstruction must be clearly evidenced.",
    fineAmount: fineAmountBandA(),
    difficulty: "Moderate",
    tags: ["car park", "obstruction", "blocking"],
  },
  {
    code: "93",
    title: "Parked in a car park when closed",
    description:
      "Parked in a council car park outside its opening hours.",
    wardenNote:
      "Opening hours must be clearly posted at the entrance. If you were locked in due to the car park closing early, this is strong grounds to challenge and claim any recovery costs.",
    commonMistakes: [
      "Hours not clearly signed at entrance",
      "Car park closed early without notice",
      "Seasonal hours change not publicised",
    ],
    yourRights:
      "If hours weren't clearly signed or the car park closed earlier than advertised, challenge and document everything.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "closed", "outside hours"],
  },
  {
    code: "95",
    title:
      "Parked in a parking place for a purpose other than that designated",
    description:
      "Used a parking space for a purpose other than the one it was designated for — for example, using a short-stay bay for storage of a vehicle.",
    wardenNote:
      "Catch-all for misuse of designated spaces. The designation must be clearly signed. Common with permit holders using pay bays, or long-term storage in short-stay bays.",
    commonMistakes: [
      "Designation not clearly signed",
      "Purpose misunderstood",
      "Shared use bay rules not followed",
    ],
    yourRights:
      "The designation must be clearly signed within the car park. If it wasn't, challenge.",
    fineAmount: fineAmountBandB(),
    difficulty: "Moderate",
    tags: ["car park", "wrong purpose", "designated parking"],
  },
  {
    code: "96",
    title: "Parked with engine running where prohibited (off-street)",
    description:
      "Left the engine running in a council car park where idling is prohibited.",
    wardenNote:
      "Same as on-street code 63 but in a car park. Warning must be given first. Prohibition must be signed within the car park.",
    commonMistakes: [
      "No warning given",
      "Prohibition not signed in car park",
      "Engine running for accessibility reasons",
    ],
    yourRights:
      "A warning must be given before a PCN is issued. If no warning was given, challenge immediately.",
    fineAmount: fineAmountBandB(),
    difficulty: "Easy",
    tags: ["car park", "idling", "engine running"],
  },
  {
    code: "99",
    title:
      "Stopped on a pedestrian crossing or on a crossing area marked by zigzags",
    description:
      "Stopped on a pedestrian crossing or within the zigzag area leading up to it.",
    wardenNote:
      "One of the most serious parking contraventions. Zigzag areas exist to keep crossings visible and safe. No stopping is permitted in the zigzag area at any time — there are no restricted hours, no loading exemptions. CEOs and cameras enforce this strictly. Adjudicators have very little sympathy for challenges here.",
    commonMistakes: [
      "Brief stop assumed permissible",
      "Unaware zigzag area extended that far",
      "Loading assumed to be exempt (it is not)",
    ],
    yourRights:
      "Grounds for challenge are very limited. Defective or missing zigzag markings is the main one. If the lines were faded or missing, photograph immediately.",
    fineAmount: fineAmountBandA(),
    difficulty: "Hard",
    tags: ["pedestrian crossing", "zigzag", "crossing area", "zebra crossing"],
  },
];

/** Standard comparison-table amounts (Civil Enforcement of Parking Contraventions levels). */
export const FINE_LEVELS_TABLE = {
  outsideLondon: {
    bandA: { reduced: 50, full: 100 },
    bandB: { reduced: 25, full: 50 },
  },
  london: {
    bandA: { reduced: 65, full: 130 },
    bandB: { reduced: 50, full: 100 },
  },
} as const;

/** Codes typically charged at Band A (higher) outside London. */
export const TYPICAL_BAND_A_CODES = new Set([
  "12",
  "14",
  "16",
  "18",
  "19",
  "20",
  "21",
  "26",
  "40",
  "41",
  "42",
  "43",
  "45",
  "46",
  "47",
  "48",
  "49",
  "55",
  "56",
  "57",
  "61",
  "70",
  "71",
  "78",
  "80",
  "89",
  "92",
  "99",
]);

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
