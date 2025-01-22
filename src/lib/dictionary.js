
const dictionaries = {
  en: () => import('../messages/en.json'),
  th: () => import('../messages/th.json'),
}

export const getDictionary = async (locale) => {
  try {
    const dictionary = await dictionaries[locale]();
    console.log('Loaded dictionary:', dictionary); // Debug log
    return dictionary;
  } catch (error) {
    console.error('Error loading dictionary:', error);
    // Fallback to default dictionary
    return {
      header: {
        become_prefix: 'Become a',
        become_tutor: 'Tutor',
        sign_in: 'Sign in',
        join: 'Join'
      }
    };
  }
}