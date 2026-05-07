import type { Achievement } from "@/types";

interface AchievementsProps {
  achievements?: Achievement[];
}

export function Achievements({ achievements = [] }: AchievementsProps) {
  if (achievements.length === 0) {
    return (
      <section id="achievements" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-heading text-3xl font-semibold text-[var(--ink)]">
            Life in General
          </h2>
          <p className="mt-4 text-[var(--body)]">This section is on hold for now.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-3xl font-semibold text-[var(--ink)]">Life in General</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className="rounded-xl border border-[var(--hairline)] p-5"
            >
              <h3 className="text-lg font-medium text-[var(--ink)]">{achievement.title}</h3>
              <p className="mt-2 text-sm text-[var(--body)]">{achievement.description}</p>
              {achievement.date ? (
                <p className="mt-3 font-mono text-xs text-[var(--charcoal)]">{achievement.date}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
