/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  UsageOccasion,
  ScentProfile,
  ScentStrength,
  QuizAnswers,
} from "@/types/product.interface";
import {
  LucideIcon,
  Leaf,
  Briefcase,
  PartyPopper,
  CalendarHeart,
  Trees,
  Wind,
  Flame,
  Droplet,
  ArrowRight,
  Loader2,
  User,
  BicepsFlexed,
  Feather,
  Rows2,
} from "lucide-react";
import { getRecommendations } from "@/services/admin/productsManagement";
import Image from "next/image";
import { BUDGET_OPTIONS, BudgetOption } from "@/utils/budget-options";
import Link from "next/link";

// Category options mapping
export enum Category {
  MEN = "MEN",
  WOMEN = "WOMEN",
}

interface OptionCardProps {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}

const OptionCard = ({
  active,
  onClick,
  icon: Icon,
  label,
}: OptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-card/50 text-muted-foreground hover:border-ring hover:bg-muted"
    }`}
  >
    {active && (
      <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
      </div>
    )}
    <Icon className="w-8 h-8 mb-3" strokeWidth={1.5} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default function FragranceFinder() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[] | null>(null);

  // Quiz selections
  const [category, setCategory] = useState<Category | null>(null);
  const [usages, setUsages] = useState<UsageOccasion[]>([]);
  const [scentProfiles, setScentProfiles] = useState<ScentProfile[]>([]);
  const [strength, setStrength] = useState<ScentStrength | null>(null);
  const [budget, setBudget] = useState<BudgetOption | null>(null);

  const toggleArrayItem = <T,>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    value: T,
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleFetchRecommendations = async () => {
    if (!strength || !category) return;
    setLoading(true);

    const payload: QuizAnswers & { category?: string } = {
      category,
      usages,
      scentProfiles,
      strength,
      minPrice: budget?.minPrice,
      maxPrice: budget?.maxPrice,
    };

    const response = await getRecommendations(payload);
    if (response.success) {
      setResults(response.data);
      setCurrentStep(6); // Move to results step
    }
    setLoading(false);
  };

  if (results && currentStep === 6) {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-2xl font-bold mb-2">Match Results</h2>
        <p className="text-muted-foreground mb-8">
          We found {results.length} fragrances that meet your preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="border border-border rounded-2xl p-6 bg-card/50 flex flex-col relative"
            >
              <div className="absolute top-6 right-6 border border-primary text-primary rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg">
                {item.matchPercentage}%
              </div>

              <div className="h-48 relative mb-6 w-full flex justify-center items-center">
                <Image
                  src={item?.product?.images?.[0] || "/placeholder.jpg"}
                  alt={item.product?.name || "Product Image"}
                  width={100}
                  height={100}
                  className="object-contain max-h-full"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {item.product.name}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.product.scentProfiles?.map((s: string) => (
                  <span
                    key={s}
                    className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold">৳{item.product.price}</span>

                <Link
                  href={`/products/${item.product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  type="button"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setResults(null);
            setCurrentStep(1);
          }}
          className="mt-12 text-muted-foreground hover:text-foreground underline mx-auto block"
        >
          Retake the Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* STEP 1: CATEGORY */}
      <div
        className={`p-8 border rounded-2xl transition-all duration-500 ${
          currentStep === 1
            ? "border-primary/20 bg-background"
            : "border-border bg-background opacity-50"
        }`}
      >
        <div className="text-sm text-muted-foreground font-medium mb-1">
          Step 1 of 5
        </div>
        <h2 className="text-2xl font-semibold mb-2">Who is this for?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Select the targeted category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionCard
            icon={User}
            label="Men"
            active={category === Category.MEN}
            onClick={() => setCategory(Category.MEN)}
          />
          <OptionCard
            icon={User}
            label="Women"
            active={category === Category.WOMEN}
            onClick={() => setCategory(Category.WOMEN)}
          />
        </div>

        {currentStep === 1 && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              disabled={!category}
              onClick={() => setCurrentStep(2)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* STEP 2: OCCASION */}
      <div
        className={`p-8 border rounded-2xl transition-all duration-500 ${
          currentStep === 2
            ? "border-border bg-card/80"
            : "border-border bg-background opacity-50"
        }`}
      >
        <div className="text-sm text-muted-foreground font-medium mb-1">
          Step 2 of 5
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          What are you looking for?
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Choose the occasion or use case.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <OptionCard
            icon={Leaf}
            label="Daily use"
            active={usages.includes(UsageOccasion.DAILY)}
            onClick={() =>
              toggleArrayItem<UsageOccasion>(setUsages, UsageOccasion.DAILY)
            }
          />
          <OptionCard
            icon={Briefcase}
            label="Office"
            active={usages.includes(UsageOccasion.OFFICE)}
            onClick={() =>
              toggleArrayItem<UsageOccasion>(setUsages, UsageOccasion.OFFICE)
            }
          />
          <OptionCard
            icon={PartyPopper}
            label="Party"
            active={usages.includes(UsageOccasion.PARTY)}
            onClick={() =>
              toggleArrayItem<UsageOccasion>(setUsages, UsageOccasion.PARTY)
            }
          />
          <OptionCard
            icon={CalendarHeart}
            label="Date"
            active={usages.includes(UsageOccasion.DATE)}
            onClick={() =>
              toggleArrayItem<UsageOccasion>(setUsages, UsageOccasion.DATE)
            }
          />
          <OptionCard
            icon={Trees}
            label="Outdoor"
            active={usages.includes(UsageOccasion.OUTDOOR)}
            onClick={() =>
              toggleArrayItem<UsageOccasion>(setUsages, UsageOccasion.OUTDOOR)
            }
          />
        </div>

        {currentStep === 2 && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              disabled={usages.length === 0}
              onClick={() => setCurrentStep(3)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* STEP 3: SCENT PROFILE */}
      <div
        className={`p-8 border rounded-2xl transition-all duration-500 ${
          currentStep === 3
            ? "border-border bg-card/80"
            : "border-border bg-background opacity-50"
        }`}
      >
        <div className="text-sm text-muted-foreground font-medium mb-1">
          Step 3 of 5
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Select your scent profiles?
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Select your favorite scent profile(s).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OptionCard
            icon={Wind}
            label="Fresh"
            active={scentProfiles.includes(ScentProfile.FRESH)}
            onClick={() =>
              toggleArrayItem<ScentProfile>(
                setScentProfiles,
                ScentProfile.FRESH,
              )
            }
          />
          <OptionCard
            icon={Droplet}
            label="Sweet"
            active={scentProfiles.includes(ScentProfile.SWEET)}
            onClick={() =>
              toggleArrayItem<ScentProfile>(
                setScentProfiles,
                ScentProfile.SWEET,
              )
            }
          />
          <OptionCard
            icon={Trees}
            label="Woody"
            active={scentProfiles.includes(ScentProfile.WOODY)}
            onClick={() =>
              toggleArrayItem<ScentProfile>(
                setScentProfiles,
                ScentProfile.WOODY,
              )
            }
          />
          <OptionCard
            icon={Flame}
            label="Spicy"
            active={scentProfiles.includes(ScentProfile.SPICY)}
            onClick={() =>
              toggleArrayItem<ScentProfile>(
                setScentProfiles,
                ScentProfile.SPICY,
              )
            }
          />
        </div>

        {currentStep === 3 && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              disabled={scentProfiles.length === 0}
              onClick={() => setCurrentStep(4)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* STEP 4: STRENGTH */}
      <div
        className={`p-8 border rounded-2xl transition-all duration-500 ${
          currentStep === 4
            ? "border-border bg-card/80"
            : "border-border bg-background opacity-50"
        }`}
      >
        <div className="text-sm text-muted-foreground font-medium mb-1">
          Step 4 of 5
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          How strong do you want it?
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Choose the intensity you want.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <OptionCard
            icon={Feather}
            label="Mild"
            active={strength === ScentStrength.MILD}
            onClick={() => setStrength(ScentStrength.MILD)}
          />
          <OptionCard
            icon={Rows2}
            label="Medium"
            active={strength === ScentStrength.MEDIUM}
            onClick={() => setStrength(ScentStrength.MEDIUM)}
          />
          <OptionCard
            icon={BicepsFlexed}
            label="Strong"
            active={strength === ScentStrength.STRONG}
            onClick={() => setStrength(ScentStrength.STRONG)}
          />
        </div>

        {currentStep === 4 && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              disabled={!strength}
              onClick={() => setCurrentStep(5)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* STEP 5: BUDGET */}
      <div
        className={`p-8 border rounded-2xl transition-all duration-500 ${
          currentStep === 5
            ? "border-border bg-card/80"
            : "border-border bg-background opacity-50"
        }`}
      >
        <div className="text-sm text-muted-foreground font-medium mb-1">
          Step 5 of 5
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          What&apos;s your budget?
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Select your price budget (Optional).
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          {BUDGET_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setBudget(opt)}
              className={`px-6 py-3 rounded-full border font-medium transition-colors ${
                budget?.label === opt.label
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-ring"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {currentStep === 5 && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleFetchRecommendations}
              disabled={loading}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-70 hover:bg-primary/90 transition-colors shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Get Recommendation"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
