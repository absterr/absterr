"use client";
import { categories } from "@/lib/service-categories";
import { ServiceSelectorValue } from "./contact-schema";

export const CUSTOM_CATEGORY = "custom";

const pill = (active: boolean) =>
  `px-4 py-2 text-xs xl:text-sm border transition-colors duration-200 ${
    active
      ? "bg-foreground text-background border-foreground"
      : "border-foreground/20 text-foreground/80 hover:border-foreground/60"
  }`;

const field =
  "w-full border border-foreground/20 p-3 text-xs xl:text-sm placeholder-foreground/20 focus:border-foreground focus:outline-none";

export default function ServiceSelector({
  value,
  onChangeAction,
}: {
  value: ServiceSelectorValue;
  onChangeAction: (value: ServiceSelectorValue) => void;
}) {
  const isCustom = value.categoryIds.includes(CUSTOM_CATEGORY);
  const visibleServices = [
    ...new Set(
      categories
        .filter((c) => value.categoryIds.includes(c.id))
        .flatMap((c) => c.services)
    ),
  ];

  return (
    <div className="text-sm tracking-wide flex flex-col gap-y-6">
      <label>
        What&apos;s on your mind?<span className="text-accent"> *</span>
      </label>

      <div className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={value.categoryIds.includes(c.id)}
            onClick={() => onChangeAction(pickCategory(value, c.id))}
            className={pill(value.categoryIds.includes(c.id))}
          >
            {c.label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={isCustom}
          onClick={() => onChangeAction(pickCategory(value, CUSTOM_CATEGORY))}
          className={pill(isCustom)}
        >
          Custom
        </button>
      </div>

      {isCustom ? (
        <div className="flex flex-col gap-6">
          <div className="max-w-xs flex flex-col gap-2">
            <label htmlFor="custom-subject">
              Subject <span className="text-accent"> *</span>
            </label>
            <input
              id="custom-subject"
              placeholder="Name it"
              value={value.customCategory.subject}
              onChange={(e) =>
                onChangeAction({
                  ...value,
                  customCategory: {
                    ...value.customCategory,
                    subject: e.target.value,
                  },
                })
              }
              className={field}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="custom-description">
              Description <span className="text-accent"> *</span>
            </label>
            <textarea
              id="custom-description"
              rows={3}
              placeholder="Tell us what you need"
              value={value.customCategory.description}
              onChange={(e) =>
                onChangeAction({
                  ...value,
                  customCategory: {
                    ...value.customCategory,
                    description: e.target.value,
                  },
                })
              }
              className={`${field} resize-none`}
            />
          </div>
        </div>
      ) : visibleServices.length > 0 ? (
        <>
          <label htmlFor="custom-description">
            Which services do you seek?
            <span className="text-accent"> *</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {visibleServices.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={value.services.includes(s)}
                onClick={() => onChangeAction(pickService(value, s))}
                className={pill(value.services.includes(s))}
              >
                {s}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={value.customServiceSelected}
              onClick={() => onChangeAction(pickCustomService(value))}
              className={pill(value.customServiceSelected)}
            >
              Custom
            </button>
          </div>

          {value.customServiceSelected && (
            <div className="flex flex-col gap-2">
              <label htmlFor="custom-service">
                Describe the custom service
                <span className="text-accent"> *</span>
              </label>
              <textarea
                id="custom-service"
                rows={3}
                placeholder="What else do you need?"
                value={value.customService}
                onChange={(e) =>
                  onChangeAction({ ...value, customService: e.target.value })
                }
                className={`${field} resize-none`}
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// Pure transforms: given the current value + an action, return the next value.
const pickCategory = (
  value: ServiceSelectorValue,
  id: string
): ServiceSelectorValue => {
  const isCustom = value.categoryIds.includes(CUSTOM_CATEGORY);

  if (id === CUSTOM_CATEGORY) {
    return {
      ...value,
      categoryIds: isCustom ? [] : [CUSTOM_CATEGORY],
      services: [],
      customServiceSelected: false,
    };
  }

  if (isCustom) {
    return {
      ...value,
      categoryIds: [id],
      services: [],
      customServiceSelected: false,
    };
  }

  const wasSelected = value.categoryIds.includes(id);
  const categoryIds = wasSelected
    ? value.categoryIds.filter((c) => c !== id)
    : [...value.categoryIds, id];

  // Recompute from the *new* category list rather than just the one being removed
  const stillOffered = new Set(
    categories
      .filter((c) => categoryIds.includes(c.id))
      .flatMap((c) => c.services)
  );

  return {
    ...value,
    categoryIds,
    services: value.services.filter((s) => stillOffered.has(s)),
  };
};

const pickService = (
  value: ServiceSelectorValue,
  service: string
): ServiceSelectorValue => {
  return {
    ...value,
    services: value.services.includes(service)
      ? value.services.filter((s) => s !== service)
      : [...value.services, service],
    customServiceSelected: false,
  };
};

const pickCustomService = (
  value: ServiceSelectorValue
): ServiceSelectorValue => {
  const customServiceSelected = !value.customServiceSelected;
  return {
    ...value,
    customServiceSelected,
    services: customServiceSelected ? [] : value.services,
  };
};
