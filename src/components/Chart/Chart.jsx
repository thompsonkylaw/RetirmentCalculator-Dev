import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Line } from 'recharts';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const ChartComponent = (props) => {
  const { title, data, currentAge, fromAge, toAge } = props;
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update chart dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Filter data for specific ranges and set tick marks
  const specificAges = [currentAge, fromAge - 1, toAge];
  const dataInRange = data.filter(d => parseFloat(d.name) >= currentAge && parseFloat(d.name) <= fromAge - 1);

  // Format numbers based on language (e.g., "万" for Chinese, "K/M" for English)
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '';
    const absNum = Math.abs(num);
    const lang = i18n.language;

    if (lang.startsWith('zh')) {
      const isTraditional = lang === 'zh-HK';
      const suffix = isTraditional ? '萬' : '万';
      if (absNum >= 10000) {
        const wanValue = (absNum / 10000).toFixed(1).replace(/\.0$/, '');
        return `${num < 0 ? '-' : ''}${wanValue}${suffix}`;
      }
      return num.toString();
    } else {
      if (absNum >= 1000000) {
        const mValue = Math.round(absNum / 1000000);
        return `${num < 0 ? '-' : ''}${mValue}M`;
      } else if (absNum >= 1000) {
        const kValue = Math.round(absNum / 1000);
        return `${num < 0 ? '-' : ''}${kValue}K`;
      }
      return num.toString();
    }
  };

  // Convert English title to translation key (e.g., "Version 1" -> "version_1")
  const getTranslationKey = (englishTitle) => {
    const versionNumber = englishTitle.split(' ')[1];
    return `version_${versionNumber}`;
  };

  // Get translated title using the translation key
  const translationKey = getTranslationKey(title);
  const translatedTitle = t(translationKey);

  return (
    <Card
      ref={containerRef}
      sx={{
        width: '100%',
        height: '450px',
        margin: '20px 0',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        {translatedTitle}
      </Typography>
      <AreaChart
        width={dimensions.width}
        height={dimensions.height - 40}
        data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 30 }}
      >
        <defs>
          <linearGradient id="gradientFillFirst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#219a52" stopOpacity={1} />
            <stop offset="100%" stopColor="#219a52" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="gradientFillSecond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#ff9900" stopOpacity={1} />
            <stop offset="100%" stopColor="#ff9900" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis
          dataKey="name"
          type="number"
          domain={[currentAge, toAge]}
          ticks={specificAges}
          label={{ value: t('age'), position: 'bottom', offset: 0 }}
          tick={{ fill: '#667' }}
        />
        <YAxis
          label={{
            value: t('amount'),
            angle: -90,
            position: 'left',
            offset: 10,
          }}
          tickFormatter={(value) => formatNumber(value)}
          tick={{ fill: '#666' }}
        />
        <Tooltip
          formatter={(value) => [`$${Number(value).toLocaleString()}`, t('amount')]}
          labelFormatter={(label) => `${t('age')}: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="sum"
          data={data}
          fill="url(#gradientFillSecond)"
          stroke="none"
        />
        <Area
          type="monotone"
          dataKey="sum"
          data={dataInRange}
          fill="url(#gradientFillFirst)"
          stroke="none"
        />
        <Line
          type="monotone"
          dataKey="sum"
          data={data}
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <ReferenceLine
          y={0}
          stroke="#000"
          strokeWidth={2}
        />
      </AreaChart>
    </Card>
  );
};

// Default props
ChartComponent.defaultProps = {
  title: 'Version 1',
  data: [],
};

export default ChartComponent;