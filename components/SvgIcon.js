//import svg elements from react-native-svg
import Svg, { Defs, Path, G, Use } from 'react-native-svg';

//create child component
//include the converted SVG (convert by using browser React SVGR: https://react-svgr.com/playground/)
const SvgIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Defs>
      <Path
        id="a"
        d="M12 13.253c3.24 0 9.6 1.577 9.6 4.852v2.426H2.4v-2.426c0-3.275 6.36-4.852 9.6-4.852Zm8.64 6.318v-1.466c0-2.014-4.663-3.892-8.64-3.892-3.977 0-8.64 1.878-8.64 3.892v1.466h17.28ZM12 11.36c-2.376 0-4.32-1.917-4.32-4.26S9.624 2.84 12 2.84c2.376 0 4.32 1.917 4.32 4.26s-1.944 4.26-4.32 4.26Zm0-.96c1.849 0 3.36-1.49 3.36-3.3 0-1.81-1.511-3.3-3.36-3.3S8.64 5.29 8.64 7.1c0 1.81 1.511 3.3 3.36 3.3Z"
      />
    </Defs>
    <G fill="none" fillRule="evenodd" transform="translate(-2 -2)">
      <Path d="M0 0h24v23.667H0z" />
      <Use xlinkHref="#a" fill="#757083" fillRule="nonzero" />
    </G>
  </Svg>
);
export default SvgIcon;
