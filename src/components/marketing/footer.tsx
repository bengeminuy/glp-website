import { AtSign, Phone, Mail } from "lucide-react";

const CONTACTS = [
  { icon: AtSign, label: "help@medvi.org", href: "mailto:help@medvi.org" },
  { icon: Phone, label: "(323) 690-1564", href: "tel:+13236901564" },
  {
    icon: Mail,
    label: "131 Continental Dr. Ste 305, Newark, DE 19713",
    href: "https://maps.google.com/?q=131+Continental+Dr+Ste+305+Newark+DE+19713",
  },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Privacy Practices", href: "/privacy-practices" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Medical Consent", href: "/medical-consent" },
  { label: "For California Residents", href: "/california-residents" },
  { label: "Bill of Rights", href: "/bill-of-rights" },
];

export function MarketingFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-2xl font-bold tracking-tight text-neutral-900">MEDVi</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {CONTACTS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="inline-flex items-center gap-3 rounded-full bg-neutral-100 px-5 py-2.5 text-sm text-neutral-800 transition-colors hover:bg-neutral-200"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-neutral-700" strokeWidth={2} aria-hidden />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-4 text-xs leading-relaxed text-neutral-500">
          <p>
            *The assessment made available on the MEDVi website does not create a doctor-patient
            relationship between the individual completing the assessment and MEDVi. OpenLoop
            Health, a network of US-licensed doctors that adhere to rigorous medical protocols
            designed for patient safety, has established exclusionary criteria to determine if an
            individual does not qualify for GLP-1s. The answers an individual provides to the MEDVi
            assessment consequently determine if the individual is screened out of eligibility for
            GLP-1 medication, and an OpenLoop Health clinician will meet with an individual after
            checkout to determine if they qualify for a prescription. OpenLoop Health clinicians
            retain the decision to prescribe compounded GLP-1s to patients.
          </p>
          <p>
            All claims and benefits on this website refer to self-reported data from GLP-1 customers
            on a treatment plan that includes compounded GLP-1 medications and consultations with
            medical professionals. Customers reported their weight on their initial medical intake
            questionnaire every 3-4 weeks thereafter. Results from compounded medications found on
            the MEDVi platform may vary and be affected by an individual&apos;s adherence to the
            program and their clinician&apos;s recommendations. Compounded GLP-1s are produced in
            FDA-regulated facilities. Although these facilities are highly regulated, the
            medications are not FDA-approved or evaluated for safety, efficacy, or quality. The
            decision to use compounded drugs is guided by the licensed provider&apos;s medical
            judgment, which is informed by a telehealth consultation and medical history.
          </p>
          <p>
            We encourage all prospective users of compounded medications to speak with their
            provider about the specific risks and benefits that may come with the use of compounded
            medication. MEDVi does not produce compounded medications, and individuals may receive
            medication that looks different than what is portrayed on the website.
          </p>
          <p>
            *Free to end users subject to insurance and copays eligibility to be determined at time
            of visit.
          </p>

          <div className="pt-4">
            <p className="mb-2 font-semibold text-neutral-700">Pharmacy Providers</p>
            <p>
              We are partnered with multiple USA certified pharmacies to bring the best product and
              overall experience to our membership. Our team meets regularly with pharmacies to
              discuss any product shortages, shipping delays, and get updated reports on their
              medication testing.
            </p>
          </div>

          <p>
            *Results vary based on starting weight and program adherence. Inches lost from hips,
            waist, chest, thighs and arms in the first month. Patients exercised daily and ate a
            reduced-calorie diet. Their fat loss is not typical. Results may vary. Medication
            prescriptions are at the discretion of medical providers and may not be suitable for
            everyone. MEDVi patients typically result in 1-2 lbs per week weight loss after 4 weeks,
            involving a healthy diet and exercise changes. Consult a healthcare professional before
            using medication or starting any weight loss program. *Based on the average weight loss
            as reported by patients without diabetes who reached and maintained a dose of 2.4
            mg/week of GLP-1 treatment, along with a reduced-calorie diet and increased physical
            activity.
          </p>
          <p>
            Medication is included in the cost of the MEDVi Program. Wegovy<sup>®</sup> is
            FDA-approved for weight loss. Ozempic<sup>®</sup> is FDA-approved for type 2 diabetes
            treatment but may be prescribed for weight loss. The trademarks, service marks, trade
            names (Wegovy<sup>®</sup>, Ozempic<sup>®</sup>), and products displayed on this Internet
            site are protected and belong to their respective owners. Medical treatment is provided
            by &ldquo;CareGLP Affiliated P.C.s,&rdquo; and OpenLoop Health, affiliated networks for
            medical professional corporations and associations. No data, photos, claims or any other
            information is associated with results derived from clinical trials, studies or public
            information and is always representative of MEDVi patient experience.
          </p>
          <p>
            Certain materials on this website, including text, images, and other media, may be
            generated or enhanced using artificial intelligence technologies or models. No
            representation or warranty is made regarding the accuracy, completeness, or reliability
            of such content. Individuals appearing in advertisements may be actors or models.
          </p>
          <p>
            Testimonials on the website are from MEDVi patients. For patient privacy, images
            representing those testimonials may use models.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-700 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-neutral-700">
            &copy; {new Date().getFullYear()} MEDVi. All rights reserved
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center">
                {i > 0 && <span className="mx-3 text-neutral-300" aria-hidden>|</span>}
                <a
                  href={link.href}
                  className="text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
