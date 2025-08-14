import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inputsCustomizations } from './custom/inputs';
import { dataDisplayCustomizations } from './custom/dataDisplay';
import { feedbackCustomizations } from './custom/feedback';
import { navigationCustomizations } from './custom/navigation';
import { surfacesCustomizations } from './custom/surfaces';
import { colorSchemes, typography, shadows, shape, getTheme } from './themePrimitives';

function AppTheme(props) {
  const { children, disableCustomColor, themeComponents, mode } = props;
  const theme = React.useMemo(() => {
    const baseTheme = getTheme(mode);
    //const selectedColorSchemes = setLandingColorSchemes ? LandingColorSchemes : colorSchemes;
    return createTheme({
      ...baseTheme,
      // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes: disableCustomColor ? {} : { [mode]: colorSchemes[mode] }, // Ensure colorSchemes is an object with mode as key
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomColor, themeComponents, mode]);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomColor: PropTypes.bool,
  //setLandingColorSchemes: PropTypes.bool,
  themeComponents: PropTypes.object,
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default AppTheme;