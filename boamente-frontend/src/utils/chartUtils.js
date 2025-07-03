export function formatSentimentDataByPeriod(apiData) {
  console.log("Recebo - ", apiData);

  // Estrutura padrão com rótulos em português
  const defaultStructure = {
    semana: { labels: [], Positive: [], Neutral: [], Negative: [] },
    mes: { labels: [], Positive: [], Neutral: [], Negative: [] },
    ano: { labels: [], Positive: [], Neutral: [], Negative: [] },
    dia: { labels: [], Positive: [], Neutral: [], Negative: [] }
  };

  if (!apiData || !Array.isArray(apiData)) return defaultStructure;

  // Map para traduzir periodType para português
  const periodMap = {
    WEEKLY: 'semana',
    MONTHLY: 'mes',
    YEARLY: 'ano',
    DAILY: 'dia'
  };

  // Processamento dos dados
  apiData.forEach(item => {
    const periodType = periodMap[item.periodType] || 'semana'; // fallback seguro
    const structure = defaultStructure[periodType];

    if (!structure.labels.includes(item.periodLabel)) {
      structure.labels.push(item.periodLabel);
    }

    structure.Positive.push(item.sentiment === 'Positive' ? item.count : 0);
    structure.Neutral.push(item.sentiment === 'Neutral' ? item.count : 0);
    structure.Negative.push(item.sentiment === 'Negative' ? item.count : 0);
  });

  console.log("Formatado:", defaultStructure);
  return defaultStructure;
}
