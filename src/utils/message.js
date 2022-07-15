export const getHealthLevelByPercent = (pct) => {
  let status = 'Excellent';

  if (pct <= 99) {
    status = 'A few scratches';
  }
  if (pct <= 89) {
    status = 'A nasty looking welt on the forehead';
  }
  if (pct <= 82) {
    status = 'Some small wounds and bruises';
  }
  if (pct <= 75) {
    status = 'Minor wounds';
  }
  if (pct <= 68) {
    status = 'Winces in pain';
  }
  if (pct <= 61) {
    status = 'Quite a few wounds';
  }
  if (pct <= 54) {
    status = 'Grimaces with pain';
  }
  if (pct <= 47) {
    status = 'Nasty wounds and bleeding cuts';
  }
  if (pct <= 40) {
    status = 'Some large, gaping wounds';
  }
  if (pct <= 35) {
    status = 'Pretty awful';
  }
  if (pct <= 28) {
    status = 'Many grievous wounds, screaming in agony';
  }
  if (pct <= 21) {
    status = 'Covered with blood from oozing wounds, vomiting blood';
  }
  if (pct <= 14) {
    status = 'Pales visibly as death nears';
  }
  if (pct <= 7) {
    status = 'Barely clings to life';
  }
  if (pct <= 0) {
    status = 'Dead';
  }

  return status;
};

export const getDamageLevelByAmount = (amt) => {
  let level = 'barely touch';
  let levels = 'barely touches';
  if (amt >= 3) {
    level = 'scratch';
    levels = 'scratches';
  }
  if (amt >= 4) {
    level = 'bruise';
    levels = 'bruises';
  }
  if (amt >= 5) {
    level = 'hit';
    levels = 'hits';
  }
  if (amt >= 6) {
    level = 'injure';
    levels = 'injures';
  }
  if (amt >= 8) {
    level = 'wound';
    levels = 'wounds';
  }
  if (amt >= 10) {
    level = 'draw blood from';
    levels = 'draws blood from';
  }
  if (amt >= 12) {
    level = 'smite';
    levels = 'smites';
  }
  if (amt >= 15) {
    level = 'massacre';
    levels = 'massacres';
  }
  if (amt >= 21) {
    level = 'decimate';
    levels = 'decimates';
  }
  if (amt >= 26) {
    level = 'devastate';
    levels = 'devastates';
  }
  if (amt >= 31) {
    level = 'maim';
    levels = 'maims';
  }
  if (amt >= 41) {
    level = 'mutilate';
    levels = 'mutilates';
  }
  if (amt >= 51) {
    level = 'pulverise';
    levels = 'pulverises';
  }
  if (amt >= 61) {
    level = 'demolish';
    levels = 'demolishes';
  }
  if (amt >= 71) {
    level = 'mangle';
    levels = 'mangles';
  }
  if (amt >= 81) {
    level = 'obliterate';
    levels = 'obliterates';
  }
  if (amt >= 91) {
    level = 'annihilate';
    levels = 'annihilates';
  }
  if (amt >= 101) {
    level = 'horribly maim';
    levels = 'horribly maims';
  }
  if (amt >= 131) {
    level = 'viciously rend';
    levels = 'viciously rends';
  }

  return [level, levels];
};
