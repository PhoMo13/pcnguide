export type AppealTier = "standard" | "premium";

export type AppealData = {
  tier: AppealTier;
  contraventionCode: string;
  contraventionDescription: string;
  pcnNumber: string;
  pcnDate: string;
  vehicleReg: string;
  issuingCouncil: string;
  location: string;
  grounds: string[];
  evidence: string[];
  additionalInfo: string;
};

export const LETTER_SYSTEM_PROMPT = `You are an expert in UK civil parking enforcement with deep knowledge of the Traffic Management Act 2004, the Civil Enforcement of Parking Contraventions (England) General Regulations 2007, and Traffic Signs Regulations and General Directions 2016. You help drivers write formal appeal letters to challenge Penalty Charge Notices. You write clearly, formally and accurately. You never guarantee outcomes. You always recommend the driver verify details with their local council.`;

const PREMIUM_DELIMITERS = `Use the following section markers exactly (each on its own line) so the output can be parsed:

===PCNGUIDE_FIRST_APPEAL===
[First appeal letter body]

===PCNGUIDE_NTO_LETTER===
[Second letter template for the Notice to Owner stage if the first informal challenge is rejected]

===PCNGUIDE_EVIDENCE_CHECKLIST===
[Numbered evidence checklist tailored to this case]

===PCNGUIDE_SUBMISSION_GUIDE===
[Step-by-step submission guide: where to send, what to include, deadlines reminder — without guaranteeing any outcome]`;

export function buildPrompt(data: AppealData): string {
  const groundsBlock =
    data.grounds.length > 0
      ? data.grounds.map((g, i) => `${i + 1}. ${g}`).join("\n")
      : "None specified.";

  const evidenceBlock =
    data.evidence.length > 0
      ? data.evidence.map((e, i) => `${i + 1}. ${e}`).join("\n")
      : "None specified.";

  const premiumBlock =
    data.tier === "premium"
      ? `
PREMIUM DELIVERABLES (MANDATORY):
In addition to the first appeal letter, you MUST also produce:
1. A second letter template suitable for the Notice to Owner (NtO) / formal representations stage if the first appeal is rejected.
2. A practical evidence checklist specific to the grounds and evidence listed.
3. A concise step-by-step submission guide (postal/online as appropriate, without naming specific council portals unless generic).

${PREMIUM_DELIMITERS}
`
      : "";

  return `Write a formal appeal letter for a UK Penalty Charge Notice (PCN) for the driver to send to the council.

RECIPIENT:
Address the letter to: "The Parking Appeals Team, ${data.issuingCouncil}"

PCN DETAILS:
- PCN number: ${data.pcnNumber}
- Date of PCN: ${data.pcnDate}
- Vehicle registration: ${data.vehicleReg}
- Location of alleged contravention: ${data.location}
- Contravention code: ${data.contraventionCode}
- Contravention (as described): ${data.contraventionDescription}

GROUNDS TO ARGUE (address each clearly and in separate paragraphs or numbered points where appropriate):
${groundsBlock}

EVIDENCE THE DRIVER SAYS THEY HAVE (reference how each would support the case; do not invent facts not stated):
${evidenceBlock}

ADDITIONAL CONTEXT FROM THE DRIVER:
${data.additionalInfo.trim() || "None provided."}

REQUIREMENTS:
- Use formal but plain English — professional, not theatrical legalese.
- Reference relevant legislation only where it genuinely supports the points made (e.g. Traffic Management Act 2004, TSRGD 2016, PoFA 2012 where material to keeper liability, signage, or procedure — do not over-cite).
- Do not guarantee success or imply the council must cancel the PCN.
- End the first appeal letter with an appropriate formal sign-off from "The Registered Keeper".
- Recommend that the driver checks dates, codes, and local council guidance on the notice.
${premiumBlock}
TIER: ${data.tier.toUpperCase()}
`;
}
