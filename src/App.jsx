//commit to caprover
import { useReducer, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import UserInput3 from './components/UserInput/UserInput3';
import UserInput4 from './components/UserInput/UserInput4';
import Chart from './components/Chart/Chart';
import LanguageSwitcher from './components/UserInput/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import ResultTable4 from './components/ResultTable/ResultTable4';

const theme = createTheme();

const initialUserInput3 = {
  retirementGoal: 20000,
  inflationAdjustment: 4,
  currentAge: 30,
  fromAge: 65,
  toAge: 85,
  postRetirementReturn: 4,
};

const initialUserInput4 = {
  monthlySavings: { stock: 0, mpf: 3000, other: 0, extra: 11708.9651157578 },
  existingAssets: { stock: 200000, mpf: 300000, other: 300000, extra: 0 },
  expectedReturn: { stock: 5, mpf: 5, other: 0.1, extra: 5 },
};

const initialUserInput = {
  userInput3: initialUserInput3,
  userInput4: initialUserInput4,
};

const savedVersionsCurrent = JSON.parse(localStorage.getItem('versionsCurrent')) || {
  ver1: initialUserInput,
  ver2: initialUserInput,
  ver3: initialUserInput,
  ver4: initialUserInput,
};

const initialState = {
  versions: {
    ver1: { current: savedVersionsCurrent.ver1, history: [], future: [] },
    ver2: { current: savedVersionsCurrent.ver2, history: [], future: [] },
    ver3: { current: savedVersionsCurrent.ver3, history: [], future: [] },
    ver4: { current: savedVersionsCurrent.ver4, history: [], future: [] },
  },
  currentVersion: 'ver1',
};

const reducer = (state, action) => {
  const currentVersion = state.currentVersion;
  const versionToUpdate = action.version || currentVersion;
  const versionState = state.versions[versionToUpdate];

  switch (action.type) {
    case 'UPDATE_INPUT3':
      return {
        ...state,
        versions: {
          ...state.versions,
          [versionToUpdate]: {
            ...versionState,
            history: [...versionState.history, versionState.current],
            current: { ...versionState.current, userInput3: action.payload },
            future: [],
          },
        },
      };
    case 'UPDATE_INPUT4':
      return {
        ...state,
        versions: {
          ...state.versions,
          [versionToUpdate]: {
            ...versionState,
            history: [...versionState.history, versionState.current],
            current: { ...versionState.current, userInput4: action.payload },
            future: [],
          },
        },
      };
    case 'UNDO':
      if (state.versions[currentVersion].history.length === 0) return state;
      const previous = state.versions[currentVersion].history[state.versions[currentVersion].history.length - 1];
      const newHistory = state.versions[currentVersion].history.slice(0, -1);
      return {
        ...state,
        versions: {
          ...state.versions,
          [currentVersion]: {
            current: previous,
            history: newHistory,
            future: [state.versions[currentVersion].current, ...state.versions[currentVersion].future],
          },
        },
      }; 
      
    case 'REDO':
      if (state.versions[currentVersion].future.length === 0) return state;
      const next = state.versions[currentVersion].future[0];
      const newFuture = state.versions[currentVersion].future.slice(1);
      return {
        ...state,
        versions: {
          ...state.versions,
          [currentVersion]: {
            current: next,
            history: [...state.versions[currentVersion].history, state.versions[currentVersion].current],
            future: newFuture,
          },
        },
      };
    case 'RESET':
      return {
        ...state,
        versions: {
          ...state.versions,
          [currentVersion]: {
            current: initialUserInput,
            history: [],
            future: [],
          },
        },
      };
    case 'SWITCH_VERSION':
      return { ...state, currentVersion: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentVersionState = state.versions[state.currentVersion];

  const [appBarColor, setAppBarColor] = useState(() => {
    return localStorage.getItem('appBarColor') || 'green';
  });

  useEffect(() => {
    localStorage.setItem('appBarColor', appBarColor);
  }, [appBarColor]);

  useEffect(() => {
    const versionsCurrent = {};
    for (const ver in state.versions) {
      versionsCurrent[ver] = state.versions[ver].current;
    }
    localStorage.setItem('versionsCurrent', JSON.stringify(versionsCurrent));
  }, [state.versions]);

  const updateUserInput3 = (newInput3) => dispatch({ type: 'UPDATE_INPUT3', payload: newInput3 });
  const updateUserInput4 = (newInput4) => dispatch({ type: 'UPDATE_INPUT4', payload: newInput4 });
  const handleUndo = () => dispatch({ type: 'UNDO' });
  const handleRedo = () => dispatch({ type: 'REDO' });
  const handleReset = () => dispatch({ type: 'RESET' });
  const handleVersionSwitch = (version) => dispatch({ type: 'SWITCH_VERSION', payload: version });

  const copyVersion = (source, target) => {
    const sourceInputs = state.versions[source].current;
    dispatch({ type: 'UPDATE_INPUT3', payload: sourceInputs.userInput3, version: target });
    dispatch({ type: 'UPDATE_INPUT4', payload: sourceInputs.userInput4, version: target });
  };

  const combinedInputs = {
    ...currentVersionState.current.userInput3,
    ...currentVersionState.current.userInput4,
    duration: currentVersionState.current.userInput3.toAge - currentVersionState.current.userInput3.fromAge,
  };

  const tableData4 = [];
  const chartData = [];
  let row_Year = [];
  let row_Age = [];
  let row_Stock = [];
  let row_MPF = [];
  let row_Other = [];
  let row_Extra = [];
  let row_sum = [];

  row_Year[0] = new Date().getFullYear();
  row_Age[0] = Number(combinedInputs.currentAge);
  row_Stock[0] = calculateValue(combinedInputs.expectedReturn.stock, combinedInputs.monthlySavings.stock, combinedInputs.existingAssets.stock);
  row_MPF[0] = calculateValue(combinedInputs.expectedReturn.mpf, combinedInputs.monthlySavings.mpf, combinedInputs.existingAssets.mpf);
  row_Other[0] = calculateValue(combinedInputs.expectedReturn.other, combinedInputs.monthlySavings.other, combinedInputs.existingAssets.other);
  row_Extra[0] = calculateValue(combinedInputs.expectedReturn.extra, combinedInputs.monthlySavings.extra, combinedInputs.existingAssets.extra);
  row_sum[0] = row_Stock[0] + row_MPF[0] + row_Other[0] + row_Extra[0];
  tableData4.push({ year: row_Year[0], age: row_Age[0], stock: row_Stock[0], mpf: row_MPF[0], other: row_Other[0], extra: row_Extra[0], sum: row_sum[0] });
  chartData.push({ name: String(row_Age[0]), sum: row_sum[0] });

  const numOfWorkingYears = combinedInputs.fromAge - combinedInputs.currentAge;
  for (let i = 1; i < numOfWorkingYears; i++) {
    row_Year[i] = row_Year[i - 1] + 1;
    row_Age[i] = row_Age[i - 1] + 1;
    row_Stock[i] = calculateValue(combinedInputs.expectedReturn.stock, combinedInputs.monthlySavings.stock, row_Stock[i - 1]);
    row_MPF[i] = calculateValue(combinedInputs.expectedReturn.mpf, combinedInputs.monthlySavings.mpf, row_MPF[i - 1]);
    row_Other[i] = calculateValue(combinedInputs.expectedReturn.other, combinedInputs.monthlySavings.other, row_Other[i - 1]);
    row_Extra[i] = calculateValue(combinedInputs.expectedReturn.extra, combinedInputs.monthlySavings.extra, row_Extra[i - 1]);
    row_sum[i] = row_Stock[i] + row_MPF[i] + row_Other[i] + row_Extra[i];
    tableData4.push({ year: row_Year[i], age: row_Age[i], stock: row_Stock[i], mpf: row_MPF[i], other: row_Other[i], extra: row_Extra[i], sum: row_sum[i] });
    chartData.push({ name: String(row_Age[i]), sum: row_sum[i] });
  }

  const tableData3 = [];
  let row_Year3 = [];
  let row_Age3 = [];
  let row_D = [];
  let row_E = [];
  let row_F = [];
  let row_G = [];

  row_Year3[0] = Math.max(...row_Year);
  row_Age3[0] = Math.max(...row_Age);
  row_D[0] = "";
  row_E[0] = "";
  row_F[0] = "";
  row_G[0] = Math.max(...row_sum);
  tableData3.push({ year: row_Year3[0], age: row_Age3[0], D: row_D[0], E: row_E[0], F: row_F[0], G: row_G[0] });

  const D2 = combinedInputs.retirementGoal * Math.pow(1 + combinedInputs.inflationAdjustment / 100, combinedInputs.fromAge - combinedInputs.currentAge);
  const E2 = D2 * 12;
  const F2 = (row_G[0] - E2) * combinedInputs.postRetirementReturn / 100;
  const G2 = row_G[0] - E2 + F2;

  row_Year3[1] = row_Year3[0] + 1;
  row_Age3[1] = row_Age3[0] + 1;
  row_D[1] = D2;
  row_E[1] = E2;
  row_F[1] = F2;
  row_G[1] = G2;
  tableData3.push({ year: row_Year3[1], age: row_Age3[1], D: row_D[1], E: row_E[1], F: row_F[1], G: row_G[1] });
  chartData.push({ name: String(row_Age3[1]), sum: row_G[1] });

  for (let i = 2; i < combinedInputs.toAge - combinedInputs.fromAge + 2; i++) {
    row_Year3[i] = row_Year3[i - 1] + 1;
    row_Age3[i] = row_Age3[i - 1] + 1;
    row_D[i] = row_D[i - 1] * (1 + combinedInputs.inflationAdjustment / 100);
    row_E[i] = row_D[i] * 12;
    row_F[i] = (row_G[i - 1] - row_E[i]) * combinedInputs.postRetirementReturn / 100;
    row_G[i] = row_G[i - 1] - row_E[i] + row_F[i];
    tableData3.push({ year: row_Year3[i], age: row_Age3[i], D: row_D[i], E: row_E[i], F: row_F[i], G: row_G[i] });
    chartData.push({ name: String(row_Age3[i]), sum: row_G[i] });
  }

  const calculateLeftSeek = (G24) => {
    let G17;
    const G18 = currentVersionState.current.userInput3.inflationAdjustment / 100;
    const G19 = currentVersionState.current.userInput3.currentAge;
    const G20 = currentVersionState.current.userInput3.toAge;
    const G21 = currentVersionState.current.userInput3.postRetirementReturn / 100;
    const E20 = currentVersionState.current.userInput3.fromAge;

    if (G21 === G18) {
      G17 = G24 / ((G20 - E20 + 1) * 12 * Math.pow(1 + G18, E20 - G19));
    } else {
      G17 = (G24 * (G21 - G18)) / ((1 - Math.pow((1 + G18) / (1 + G21), G20 - E20 + 1)) * 12 * Math.pow(1 + G18, E20 - G19) * (1 + G21));
    }
    updateUserInput3({ ...currentVersionState.current.userInput3, retirementGoal: G17 });
  };

  const calculateRightSeek = (lastRowOfStock, lastRowOfMPF, lastRowOfOther) => {
    let P18;
    const P19 = currentVersionState.current.userInput4.existingAssets.extra;
    const P20 = currentVersionState.current.userInput4.expectedReturn.extra / 100;
    const G17 = currentVersionState.current.userInput3.retirementGoal;
    const G18 = currentVersionState.current.userInput3.inflationAdjustment / 100;
    const G19 = currentVersionState.current.userInput3.currentAge;
    const G20 = currentVersionState.current.userInput3.toAge;
    const G21 = currentVersionState.current.userInput3.postRetirementReturn / 100;
    const E20 = currentVersionState.current.userInput3.fromAge;
  
    let G24;
    if (G21 === G18) {
      G24 = G17 * (G20 - E20 + 1) * 12 * Math.pow(1 + G18, E20 - G19);
    } else {
      G24 = (G17 * (1 - Math.pow((1 + G18) / (1 + G21), G20 - E20 + 1)) * 12 * Math.pow(1 + G18, E20 - G19) * (1 + G21)) / (G21 - G18);
    }
  
    const lastRowOfExtra = G24 - lastRowOfStock - lastRowOfMPF - lastRowOfOther;
  
    if (E20 <= G19) {
      console.error("Error: fromAge (E20) must be greater than currentAge (G19)");
      P18 = 0;
    } else {
      const n = 12 * (E20 - G19);
      if (P20 === 0) {
        P18 = (lastRowOfExtra - P19) / n;
      } else {
        const r = P20 / 12;
        const factor = Math.pow(1 + r, n);
        P18 = (lastRowOfExtra - P19 * factor) * r / (factor - 1);
      }
    }
  
    updateUserInput4({
      ...currentVersionState.current.userInput4,
      monthlySavings: { ...currentVersionState.current.userInput4.monthlySavings, extra: P18 },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 1, md: 0 }, minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="static" sx={{ backgroundColor: appBarColor }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => {
                window.location.href = "https://portal.aimarketings.io/tool-list/";
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
              {t('Retirement Calculator')}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="main-app">
          <style>{`
            .main-app { max-width: 1600px; margin: 0 auto; padding: 10px; font-family: 'Segoe UI', sans-serif; }
            .result td { font-size: 18px; padding: 0px; text-align: center; }
            .seek-button { margin: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer; }
          `}</style>
          <Grid container spacing={0.5}>
            <Grid item xs={12} md={5}>
              <UserInput3
                inputs={currentVersionState.current.userInput3}
                setInputs={updateUserInput3}
                onCalculate={() => calculateLeftSeek(row_G[0])}
                appBarColor={appBarColor}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <UserInput4
                inputs={currentVersionState.current.userInput4}
                setInputs={updateUserInput4}
                onCalculate={() => calculateRightSeek(row_Stock[row_Stock.length - 1], row_MPF[row_MPF.length - 1], row_Other[row_Other.length - 1])}
                appBarColor={appBarColor}
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                title={`Version ${state.currentVersion.slice(3)}`}
                data={chartData}
                currentAge={currentVersionState.current.userInput3.currentAge}
                fromAge={currentVersionState.current.userInput3.fromAge}
                toAge={currentVersionState.current.userInput3.toAge}
              />
            </Grid>
            <Grid item xs={12}>
              <LanguageSwitcher
                onReset={handleReset}
                onUndo={handleUndo}
                onRedo={handleRedo}
                undoDisabled={currentVersionState.history.length === 0}
                redoDisabled={currentVersionState.future.length === 0}
                currentVersion={state.currentVersion}
                onVersionSwitch={handleVersionSwitch}
                setAppBarColor={setAppBarColor}
                appBarColor={appBarColor}
                copyVersion={copyVersion}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
};

function calculateValue(expectedReturn, monthlySaving, existingAsset) {
  const rate = expectedReturn / 100 / 12;
  const nper = 12;
  const FV = monthlySaving * (rate === 0 ? nper : ((Math.pow(1 + rate, nper) - 1) / rate));
  const Lumpsum = existingAsset * Math.pow(1 + rate, 12);
  return FV + Lumpsum;
}

export default App;