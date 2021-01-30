export enum Lang {
  italian = 'IT',
  english = 'EN',
}

interface Categories {
  all: string;
  languages: string;
  friends: string;
  school: string;
  work: string;
  relax: string;
  fun: string;
  romance: string;
}

const italianCategories: Categories = {
  all: 'tutte',
  languages: 'Lingue',
  friends: 'Amici',
  school: 'Scuola',
  work: 'Lavoro',
  relax: 'Relax',
  fun: 'Divertimento',
  romance: 'Amore',
};

const englishCategories: Categories = {
  all: 'all',
  languages: 'languages',
  friends: 'friends',
  school: 'school',
  work: 'work',
  relax: 'relax',
  fun: 'fun',
  romance: 'romance',
};

export const getTranslatedCategory = <Category extends keyof Categories>(
  category: Category,
  language: string,
): string => {
  switch (language) {
    case Lang.italian:
      return italianCategories[category]
        ? italianCategories[category]
        : category;

    case Lang.english:
      return englishCategories[category]
        ? englishCategories[category]
        : category;

    default:
      return englishCategories[category]
        ? englishCategories[category]
        : category;
  }
};
