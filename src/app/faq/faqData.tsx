import type { ReactNode } from "react";
import Link from "next/link";

export type FaqItem = {
  id: string;
  question: string;
  /** Plain text for search matching */
  searchText: string;
  answer: ReactNode;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "About PCNs",
    items: [
      {
        id: "pcn-what",
        question: "What is a Penalty Charge Notice (PCN)?",
        searchText:
          "Penalty Charge Notice PCN civil fine council parking contravention Fixed Penalty Notice FPN police criminal Traffic Management Act 2004 civil debt points licence",
        answer: (
          <>
            A Penalty Charge Notice is a civil fine issued by a local council
            for a parking contravention. It is different from a Fixed Penalty
            Notice (FPN), which is issued by the police for criminal offences.
            PCNs are issued under the Traffic Management Act 2004 and are
            enforced as a civil debt — not a criminal matter. You cannot get
            points on your licence for a PCN.
          </>
        ),
      },
      {
        id: "pcn-who",
        question: "Who can issue a PCN?",
        searchText:
          "Council Civil Enforcement Officers CEOs traffic wardens TfL red routes bus lanes Congestion Charge private companies Euro Car Parks NCP Excel PCNGuide council",
        answer: (
          <>
            Council-employed Civil Enforcement Officers (CEOs) — sometimes still
            called traffic wardens — can issue PCNs on-street and in
            council-operated car parks. Transport for London (TfL) issues PCNs
            for red routes, bus lanes and the Congestion Charge zone. Private
            companies can issue parking charges on private land — but these are
            not PCNs and are governed by completely different rules. PCNGuide
            only covers council-issued PCNs.
          </>
        ),
      },
      {
        id: "pcn-private",
        question: "What is the difference between a PCN and a private parking ticket?",
        searchText:
          "PCN council TfL legislation private parking ticket Euro Car Parks NCP Excel contractual BPA IPC appeals",
        answer: (
          <>
            A PCN is issued by a local council or TfL and is a civil fine backed
            by legislation. A private parking ticket is issued by a company like
            Euro Car Parks, NCP, or Excel on private land. Private tickets are
            not the same as PCNs — they are contractual charges. The appeals
            process is completely different. For private tickets, contact the
            British Parking Association (BPA) or International Parking
            Community (IPC). PCNGuide only covers council-issued PCNs.
          </>
        ),
      },
      {
        id: "pcn-code",
        question: "What does my contravention code mean?",
        searchText:
          "contravention code two-digit 01 yellow line 30 longer permitted lookup warden",
        answer: (
          <>
            The two-digit code on your PCN tells you what the council says you
            did wrong. For example, code 01 means parked on a yellow line, code
            30 means parked longer than permitted. Use our free{" "}
            <Link
              href="/codes"
              className="font-semibold text-primary no-underline hover:underline"
            >
              contravention code lookup
            </Link>{" "}
            to find out exactly what your code means and what the warden should
            have checked before issuing.
          </>
        ),
      },
      {
        id: "pcn-points",
        question: "Can I get points on my licence for a parking PCN?",
        searchText:
          "points licence parking PCN civil criminal County Court credit rating",
        answer: (
          <>
            No. Parking PCNs are civil matters — they cannot result in penalty
            points on your driving licence. Only criminal driving offences carry
            points. However, if a PCN is left unpaid and reaches the County
            Court stage, it can affect your credit rating.
          </>
        ),
      },
    ],
  },
  {
    title: "Paying and Deadlines",
    items: [
      {
        id: "pay-28",
        question: "How long do I have to pay or challenge a PCN?",
        searchText:
          "28 days pay challenge informal 14 days reduced rate Notice to Owner deadline tracker",
        answer: (
          <>
            You have 28 days from the date of the PCN to either pay or make an
            informal challenge. If you pay within 14 days, you pay the reduced
            rate (usually 50% of the full charge). After 28 days without payment
            or challenge, the council will issue a Notice to Owner. Use our{" "}
            <Link
              href="/deadlines"
              className="font-semibold text-primary no-underline hover:underline"
            >
              deadline tracker
            </Link>{" "}
            to calculate your exact dates.
          </>
        ),
      },
      {
        id: "pay-14",
        question: "What happens if I pay within 14 days?",
        searchText:
          "14 days reduced rate 50 percent £100 £50 closed appeal",
        answer: (
          <>
            You pay the reduced rate — usually 50% of the full penalty. For
            example, a £100 PCN costs £50 if paid within 14 days. Once paid, the
            matter is closed. You cannot appeal after paying.
          </>
        ),
      },
      {
        id: "pay-miss-28",
        question: "What happens if I don't pay or challenge within 28 days?",
        searchText:
          "28 days Notice to Owner NtO formal representations Charge Certificate 50 percent County Court",
        answer: (
          <>
            The council will issue a Notice to Owner (NtO) to the registered
            keeper of the vehicle. The NtO gives you a further 28 days to make
            formal representations. If you ignore the NtO, a Charge Certificate
            is issued and the penalty increases by 50%. After that, the council
            can register the debt at the County Court.
          </>
        ),
      },
      {
        id: "pay-challenge-discount",
        question:
          "Can I still get the reduced rate if I challenge and the council rejects my challenge?",
        searchText:
          "reduced rate challenge rejected 14 days discount informal",
        answer: (
          <>
            If you challenge within 14 days, the council should re-offer the
            discount period if they reject your challenge. This means you still
            get the reduced rate even if your informal challenge fails — as
            long as you challenged within 14 days.
          </>
        ),
      },
      {
        id: "pay-cc",
        question: "What is a Charge Certificate?",
        searchText:
          "Charge Certificate 50 percent formal representations TEC Traffic Enforcement Centre set aside",
        answer: (
          <>
            A Charge Certificate is issued when a PCN has not been paid and the
            Notice to Owner stage has passed without payment or formal
            representations. It increases the penalty by 50%. Once a Charge
            Certificate is issued, you can no longer make formal representations
            to the council — you must either pay or apply to the Traffic
            Enforcement Centre (TEC) to have it set aside.
          </>
        ),
      },
      {
        id: "pay-ignore",
        question: "What happens if I ignore a PCN completely?",
        searchText:
          "ignore PCN Notice to Owner Charge Certificate County Court bailiffs TEC 0300 123 1059",
        answer: (
          <>
            The council will escalate through the following stages: PCN →
            Notice to Owner → Charge Certificate (penalty +50%) → County Court
            registration → warrant for enforcement agents (bailiffs). Ignoring a
            PCN is always more expensive than challenging or paying it. If you
            receive a County Court order, contact the Traffic Enforcement Centre
            (TEC) on{" "}
            <a
              href="tel:03001231059"
              className="font-semibold text-primary no-underline hover:underline"
            >
              0300 123 1059
            </a>{" "}
            immediately.
          </>
        ),
      },
    ],
  },
  {
    title: "Challenging and Appealing",
    items: [
      {
        id: "chal-can",
        question: "Can I challenge a PCN?",
        searchText:
          "challenge informal 28 days Notice to Owner formal representations Traffic Penalty Tribunal London Tribunals free",
        answer: (
          <>
            Yes. You have the right to make an informal challenge to the council
            within 28 days of the PCN. If rejected, you will receive a Notice to
            Owner, to which you can make formal representations. If those are
            rejected, you can appeal to an independent adjudicator at the
            Traffic Penalty Tribunal (outside London) or London Tribunals —
            free of charge.
          </>
        ),
      },
      {
        id: "chal-grounds",
        question: "What are the best grounds to challenge a PCN?",
        searchText:
          "grounds signs markings CEO procedure vehicle details wrong code pay display emergency PCN Checker",
        answer: (
          <>
            The strongest grounds are: signs or road markings that were missing,
            damaged or unclear; the CEO not following correct procedure (e.g.
            insufficient observation time); incorrect vehicle details on the
            PCN; the wrong contravention code; a valid pay and display ticket or
            payment that was not recognised; or a genuine emergency. Use our{" "}
            <Link
              href="/check"
              className="font-semibold text-primary no-underline hover:underline"
            >
              PCN Checker
            </Link>{" "}
            to assess your specific grounds.
          </>
        ),
      },
      {
        id: "chal-solicitor",
        question: "Do I need a solicitor to appeal a parking fine?",
        searchText:
          "solicitor lawyer appeals informal formal tribunal free appeal letter",
        answer: (
          <>
            No. The appeals process is designed to be accessible without legal
            representation. You can challenge informally by writing to the
            council, make formal representations, and appeal to the Traffic
            Penalty Tribunal yourself — all for free. Our appeal letter
            generator helps you write a structured, formal challenge based on
            your specific grounds.
          </>
        ),
      },
      {
        id: "chal-after-28",
        question: "Can I appeal after 28 days?",
        searchText:
          "28 days informal Notice to Owner formal representations Charge Certificate TEC good reason never received",
        answer: (
          <>
            You cannot make an informal challenge after 28 days. However, if
            you receive a Notice to Owner, you have a fresh 28-day window to
            make formal representations. If you have missed all deadlines and a
            Charge Certificate has been issued, you may be able to apply to the
            Traffic Enforcement Centre (TEC) to have it cancelled if you have a
            good reason — such as never having received the original PCN.
          </>
        ),
      },
      {
        id: "chal-reject",
        question: "What happens if the council rejects my appeal?",
        searchText:
          "rejected Notice of Rejection Traffic Penalty Tribunal London Tribunals 28 days binding",
        answer: (
          <>
            If the council rejects your formal representations, they must send
            you a Notice of Rejection with details of how to appeal to the
            independent Traffic Penalty Tribunal (outside London) or London
            Tribunals. You have 28 days from the Notice of Rejection to file your
            tribunal appeal. The adjudicator&apos;s decision is binding on the
            council.
          </>
        ),
      },
      {
        id: "chal-tpt",
        question: "What is the Traffic Penalty Tribunal?",
        searchText:
          "Traffic Penalty Tribunal TPT independent London Tribunals adjudicator lawyer free binding",
        answer: (
          <>
            The Traffic Penalty Tribunal (TPT) is an independent body that hears
            appeals against council-issued PCNs outside London. London Tribunals
            handles the equivalent for London. Adjudicators are qualified
            lawyers, independent from councils. Their decisions are final and
            binding. Appealing to the tribunal is free of charge. If the
            adjudicator cancels your PCN, the council must comply.
          </>
        ),
      },
      {
        id: "chal-self",
        question: "Can I appeal a PCN at the tribunal myself?",
        searchText:
          "tribunal yourself written evidence online council straightforward legal help",
        answer: (
          <>
            Yes. Most tribunal appeals are decided on written evidence — you do
            not need to attend in person. You submit your evidence online, the
            council submits theirs, and the adjudicator decides. The process is
            straightforward and designed to be used without legal help.
          </>
        ),
      },
      {
        id: "chal-driver",
        question: "What if I was not the driver when the PCN was issued?",
        searchText:
          "registered keeper driver representations hirer stolen consent liability",
        answer: (
          <>
            The PCN is issued to the registered keeper of the vehicle, not
            necessarily the driver. If you were not the driver, you can make
            representations on that basis — but you may be asked to provide the
            driver&apos;s details. If you provide the driver&apos;s name and
            address, liability can transfer to them.
          </>
        ),
      },
    ],
  },
  {
    title: "Specific Situations",
    items: [
      {
        id: "spec-loading",
        question: "I was loading — can I challenge?",
        searchText:
          "loading unloading yellow line loading bay CEO observe 5 minutes evidence tips",
        answer: (
          <>
            Yes. Genuine loading and unloading is exempt from many yellow line
            and loading bay restrictions. However, the CEO must have observed
            your vehicle for a reasonable period (typically 5 minutes) before
            concluding no loading activity was taking place. If they issued too
            quickly, challenge on the grounds of insufficient observation time.
            Read our{" "}
            <Link
              href="/evidence-tips"
              className="font-semibold text-primary no-underline hover:underline"
            >
              evidence tips
            </Link>{" "}
            for more detail.
          </>
        ),
      },
      {
        id: "spec-ticket",
        question: "My pay and display ticket fell off the dashboard — can I challenge?",
        searchText:
          "ticket fell dashboard code 06 not displayed photograph appeal valid",
        answer: (
          <>
            Yes. If you have the valid ticket, photograph it immediately and
            submit it with your appeal. Many councils cancel PCNs at first
            challenge when a valid ticket is provided. This is code 06 (ticket
            not displayed) — the ticket was valid, it just wasn&apos;t visible.
          </>
        ),
      },
      {
        id: "spec-phone",
        question: "I paid by phone but still got a PCN — what do I do?",
        searchText:
          "pay by phone screenshot receipt bank challenge procedural CEO",
        answer: (
          <>
            Get evidence of your payment immediately — a screenshot of the app
            confirmation, email receipt, or bank transaction. Challenge the PCN
            with this evidence. Pay by phone payments are logged on the
            council&apos;s system — the CEO should have checked before issuing.
            If they did not, challenge on procedural grounds.
          </>
        ),
      },
      {
        id: "spec-badge",
        question: "I have a Blue Badge — can I still get a PCN?",
        searchText:
          "Blue Badge loading bay London double yellow displayed expired hub",
        answer: (
          <>
            Yes. A Blue Badge is not a licence to park anywhere. Common
            situations where Blue Badge holders receive valid PCNs include:
            parking in a loading bay (not exempt), parking on double yellow
            lines in central London (not permitted), badge not correctly
            displayed, or badge expired. Visit our{" "}
            <Link
              href="/blue-badge"
              className="font-semibold text-primary no-underline hover:underline"
            >
              Blue Badge hub
            </Link>{" "}
            for full details on where you can and cannot park.
          </>
        ),
      },
      {
        id: "spec-signs",
        question: "The signs were unclear — is my PCN enforceable?",
        searchText:
          "signs unclear Department for Transport statutory guidance defective photograph evidence tips",
        answer: (
          <>
            Possibly not. Department for Transport statutory guidance states
            that councils should not issue PCNs when signs or road markings are
            incorrect, missing or unclear. If signage was defective, photograph
            it immediately and challenge on those grounds. Read our{" "}
            <Link
              href="/evidence-tips"
              className="font-semibold text-primary no-underline hover:underline"
            >
              evidence tips page
            </Link>{" "}
            for full guidance.
          </>
        ),
      },
      {
        id: "spec-cctv",
        question: "Can I challenge a PCN issued by CCTV camera?",
        searchText:
          "CCTV Regulation 10 post 28 days contravention procedural",
        answer: (
          <>
            Yes. The same grounds apply — signage, procedural errors, incorrect
            details. For CCTV-issued PCNs you will receive the notice by post (a
            Regulation 10 PCN). Check the date it was posted — it should have
            been sent within 28 days of the contravention. If not, that is
            itself a ground for challenge.
          </>
        ),
      },
    ],
  },
  {
    title: "About PCNGuide",
    items: [
      {
        id: "guide-legal",
        question: "Is PCNGuide legal advice?",
        searchText:
          "legal advice solicitors AI appeal letters guarantee complex",
        answer: (
          <>
            No. PCNGuide provides information and tools to help you understand
            your options. We are not solicitors and cannot provide legal advice.
            Our appeal letters are AI-generated based on the information you
            provide — they are a starting point, not a guarantee of success. For
            complex cases, seek independent legal advice.
          </>
        ),
      },
      {
        id: "guide-who",
        question: "Who runs PCNGuide?",
        searchText:
          "Civil Enforcement Officer Greater Manchester traffic warden drivers challenged",
        answer: (
          <>
            PCNGuide is run by a serving Civil Enforcement Officer (traffic
            warden) in Greater Manchester. The site exists because we saw drivers
            getting fines they could have challenged, with no clear information
            about their rights.
          </>
        ),
      },
      {
        id: "guide-accuracy",
        question: "How accurate is the information on PCNGuide?",
        searchText:
          "accurate Traffic Management Act TSRGD DfT guidance tribunal councils change",
        answer: (
          <>
            We hold every claim on this site to one standard: could it be
            defended in front of a Traffic Penalty Tribunal adjudicator? Our
            content is based on the Traffic Management Act 2004, TSRGD 2016,
            Department for Transport statutory guidance, and Traffic Penalty
            Tribunal decisions. Rules vary between councils and change over time
            — always verify with your issuing council.
          </>
        ),
      },
      {
        id: "guide-error",
        question: "If I spot an error, how do I report it?",
        searchText:
          "error report contact accuracy investigate correct",
        answer: (
          <>
            Please use our{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary no-underline hover:underline"
            >
              contact page
            </Link>
            . We take accuracy seriously and will investigate and correct any
            verified errors promptly.
          </>
        ),
      },
    ],
  },
];
