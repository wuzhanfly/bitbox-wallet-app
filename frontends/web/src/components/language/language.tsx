/**
 * Copyright 2018 Shift Devices AG
 * Copyright 2021 Shift Crypto AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from 'react';
import { i18n as Ii18n } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../dialog/dialog';
import style from './language.module.css';
import { TActiveLanguageCodes, TLanguagesList } from './types';

type TLanguageSwitchProps = {
    languages?: TLanguagesList;
}

const defaultLanguages = [
  { code: 'ar', display: 'العربية' },
  { code: 'bg', display: 'България' },
  { code: 'de', display: 'Deutsch' },
  { code: 'en', display: 'English' },
  { code: 'es', display: 'Español' },
  { code: 'fa', display: 'فارسی' },
  { code: 'fr', display: 'Français' },
  { code: 'he', display: 'עברית' },
  { code: 'hi', display: 'हिन्दी ' },
  { code: 'it', display: 'Italiano' },
  { code: 'ja', display: '日本語' },
  { code: 'ms', display: 'Bahasa Melayu' },
  { code: 'nl', display: 'Nederlands' },
  { code: 'pt', display: 'Português' },
  { code: 'ru', display: 'Русский' },
  { code: 'sl', display: 'Slovenščina' },
  { code: 'tr', display: 'Türkçe' },
  { code: 'zh', display: '中文' },
] as TLanguagesList;

const getSelectedIndex = (languages: TLanguagesList, i18n: Ii18n) => {
  const lang = i18n.language;

  // Check for exact match first.
  let index = languages.findIndex(({ code }) => code === lang);

  // A locale may contain region and other sub tags.
  // Try with a relaxed match, only the first component.
  if (index === -1 && lang.indexOf('-') > 0) {
    const tag = lang.slice(0, lang.indexOf('-'));
    index = languages.findIndex(({ code }) => code === tag);
  }

  if (index === -1 && lang.indexOf('_') > 0) {
    const tag = lang.slice(0, lang.indexOf('_'));
    index = languages.findIndex(({ code }) => code === tag);
  }

  // Give up. We tried.
  if (index === -1) {
    return 0;
  }

  return index;
};

const LanguageSwitch = ({ languages }: TLanguageSwitchProps) => {

  const { t, i18n } = useTranslation();
  const allLanguages = languages || defaultLanguages;

  const [selectedIndex, setSelectedIndex] = useState<number>(getSelectedIndex(allLanguages, i18n));
  const [activeDialog, setActiveDialog] = useState<boolean>(false);

  const changeLanguage = (langCode: TActiveLanguageCodes, index: number) => {
    setSelectedIndex(index);
    setActiveDialog(false);
    i18n.changeLanguage(langCode);
  };

  if (allLanguages.length === 1) {
    return null;
  }

  return (
    <div>
      <button
        title="Select Language"
        className={style.link}
        onClick={() => setActiveDialog(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {allLanguages[selectedIndex].code === 'en' ? 'Other languages' : 'English'}
      </button>
      {
        activeDialog && (
          <Dialog small slim title={t('language.title')} onClose={() => setActiveDialog(false)}>
            {
              allLanguages.map((language, i) => {
                const selected = selectedIndex === i;
                return (
                  <button
                    key={language.code}
                    className={[style.language, selected ? style.selected : ''].join(' ')}
                    onClick={() => changeLanguage(language.code, i)}
                    data-testid={`language-selection-${language.code}`}
                  >
                    {language.display}
                    {
                      selected && (
                        <svg
                          className={style.checked}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )
                    }
                  </button>
                );
              })
            }
          </Dialog>
        )
      }
    </div>
  );
};

export { LanguageSwitch };
