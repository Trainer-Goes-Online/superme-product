/* Real SuperMe experts, first page of mysuperme.com/experts/{coaching,therapy,yoga}, pulled 2026-11-12.
   Photos are local copies in public/experts. Refresh by re-pulling the directory. */

import type { Service } from './quiz';

export type Expert = {
  slug: string;
  name: string;
  service: Service;
  specialties: string[];
  languages: string[];
  sessions: number | null;
  years: number | null;
  rating: number | null;
};

export const EXPERTS: Expert[] = [
  {slug: "amy-weihmuller", name: "Amy Weihmuller", service: "coaching", specialties: ["Life coaching", "Wellness coaching"], languages: ["English"], sessions: 13, years: null, rating: null},
  {slug: "jeremie-kaczmarek", name: "Jérémie Kaczmarek", service: "coaching", specialties: ["Life coaching", "Wellness coaching"], languages: ["French", "English"], sessions: 13, years: null, rating: null},
  {slug: "elie-ghattas", name: "Elie Ghattas", service: "coaching", specialties: ["Executive coaching", "Life coaching", "Wellness coaching"], languages: ["French", "English"], sessions: 11, years: null, rating: null},
  {slug: "anne-cornelis", name: "Anne Cornelis", service: "coaching", specialties: ["Life coaching", "Neuro-Atypical", "Wellness coaching"], languages: ["French", "English"], sessions: 7, years: null, rating: null},
  {slug: "ayelet-magen", name: "Ayelet Magen", service: "coaching", specialties: ["Executive coaching", "Life coaching"], languages: ["English"], sessions: 16, years: null, rating: null},
  {slug: "eric-rocher", name: "Eric Rocher", service: "coaching", specialties: ["Executive coaching", "Life coaching", "Wellness coaching"], languages: ["French", "English"], sessions: 11, years: null, rating: null},
  {slug: "yvonne-daher", name: "Yvonne Daher", service: "coaching", specialties: ["Executive coaching", "Life coaching", "Wellness coaching"], languages: ["French", "English"], sessions: 15, years: null, rating: null},
  {slug: "nathalie-taurine", name: "Nathalie Taurine", service: "coaching", specialties: ["Life coaching", "Neuro-Atypical", "Wellness coaching"], languages: ["French"], sessions: 16, years: null, rating: null},
  {slug: "helene-maruejouls", name: "Helene Maruejouls", service: "coaching", specialties: ["Executive coaching", "Life coaching", "Wellness coaching"], languages: ["French"], sessions: 3, years: null, rating: null},
  {slug: "sara-camerata", name: "Sara Camerata", service: "therapy", specialties: ["Stress or burnout", "Self-esteem and confidence", "Improving general mental health wellbeing", "Romantic relationship issues", "Communication skills", "Life transitions"], languages: ["English"], sessions: 11, years: 5, rating: null},
  {slug: "adiyogi-trivedi", name: "Adiyogi Trivedi", service: "yoga", specialties: ["Kundalini", "Power Yoga", "Hatha Yoga", "Pranayama (Breathing)", "Ashtanga Vinyasa Primary Series"], languages: ["English", "Hindi"], sessions: 12, years: 8, rating: 5.0},
  {slug: "atul-mishra", name: "Atul Mishra", service: "yoga", specialties: ["Power Yoga", "Hatha Yoga", "Restorative Yoga", "Vinyasa Yoga", "Yoga Therapy"], languages: ["English", "Hindi"], sessions: 99, years: 16, rating: 5.0},
  {slug: "parul-rastogi", name: "Parul Rastogi", service: "yoga", specialties: ["Power Yoga", "Pre/Post Natal Yoga", "Office Yoga", "Hatha Yoga", "Pranayama (Breathing)"], languages: ["Hindi", "English"], sessions: 15, years: 15, rating: 5.0},
  {slug: "mathilde-torrez", name: "Mathilde Torrez", service: "yoga", specialties: ["Iyengar Yoga", "Vinyasa Yoga", "Hatha Yoga", "Pranayama (Breathing)", "Restorative Yoga"], languages: ["English", "French"], sessions: 18, years: 13, rating: 4.2},
  {slug: "sahana-bhattacharya", name: "Sahana Bhattacharya", service: "yoga", specialties: ["Gentle Yoga", "Hatha Yoga", "Pranayama (Breathing)", "Restorative Yoga", "Yoga Therapy"], languages: ["French", "English"], sessions: 13, years: 12, rating: 5.0},
  {slug: "ritu-rawat", name: "Ritu Rawat", service: "yoga", specialties: ["Ashtanga Vinyasa Primary Series", "Gentle Yoga", "Hatha Yoga", "Power Yoga", "Pranayama (Breathing)"], languages: ["English"], sessions: 9, years: 12, rating: 4.2},
  {slug: "dewashish-sao", name: "Dewashish Sao", service: "yoga", specialties: ["Power Yoga", "Vinyasa Yoga", "Gentle Yoga", "Hatha Yoga", "Pranayama (Breathing)"], languages: ["Hindi", "English"], sessions: 9, years: 12, rating: 4.4},
  {slug: "sarah-delouard", name: "Sarah Delouard", service: "yoga", specialties: ["Vinyasa Yoga", "Reiki With Yoga", "Pranayama (Breathing)", "Ashtanga Vinyasa Primary Series"], languages: ["French", "English"], sessions: 12, years: 10, rating: 5.0},
  {slug: "soumya-shrivastava", name: "Soumya Shrivastava", service: "yoga", specialties: ["Power Yoga", "Gentle Yoga", "Hatha Yoga", "Kids Yoga", "Ashtanga Vinyasa Primary Series"], languages: ["English"], sessions: 16, years: 5, rating: 3.9},
  {slug: "vignesh-r", name: "Vignesh R", service: "yoga", specialties: ["Hatha Yoga", "Iyengar Yoga", "Power Yoga", "Pranayama (Breathing)", "Vinyasa Yoga"], languages: ["English", "Hindi"], sessions: 4, years: 5, rating: 3.9},
];
