const StyleUtils = {
  /* Column Layouts */
  column: {
    flexDirection: "column",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  colCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  colVCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  colHCenter: {
    flexDirection: "column",
    justifyContent: "center",
  },

  /* Row Layouts */
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowVCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowHCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* Default Layouts */
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },
  alignItemsStretch: {
    alignItems: "stretch",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentAround: {
    justifyContent: "space-around",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
  },
  justifyContentStart: {
    justifyContent: "flex-start",
  },
  selfStretch: {
    alignSelf: "stretch",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },

  /* Sizes Layouts */
  noFlex: {
    flex: 0,
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  fill: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  noShrink: {
    flexShrink: 0,
  },
  noGrow: {
    flexGrow: 0,
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  widthAuto: {
    width: "auto",
  },
  fullWidth: {
    width: "100%",
  },
  width75: {
    width: "75%",
  },
  width80: {
    width: "80%",
  },
  halfWidth: {
    width: "50%",
  },
  fullHeight: {
    height: "100%",
  },

  /* Operation Layout */
  textCenter: {
    textAlign: "center",
  },
  textJustify: {
    textAlign: "justify",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCapital: {
    textTransform: "capitalize",
  },
  textUpper: {
    textTransform: "uppercase",
  },
  positionAbsolute: {
    position: "absolute",
  },
  positionRelative: {
    position: "relative",
  },
  overflowHidden: {
    overflow: "hidden",
  },
  overflowScroll: {
    overflow: "scroll",
  },
  overflowVisible: {
    overflow: "visible",
  },
  border: {
    borderWidth: 2,
    borderColor: "#000",
  },
  top: {
    top: "_Spacing.default.V1",
  },
  right: {
    right: "_Spacing.default.H2",
  },
  bottom: {
    bottom: "_Spacing.default.V1",
  },
  left: {
    left: "_Spacing.default.H2",
  },
  m0: {
    margin: 0,
  },
  m1: {
    margin: "_Spacing.default.H1",
  },
  m2: {
    margin: "_Spacing.default.H2",
  },
  m3: {
    margin: "_Spacing.default.H3",
  },
  m4: {
    margin: "_Spacing.default.H4",
  },
  m5: {
    margin: "_Spacing.default.H5",
  },
  ml0: {
    marginLeft: 0,
  },
  ml1: {
    marginLeft: "_Spacing.default.H1",
  },
  ml2: {
    marginLeft: "_Spacing.default.H2",
  },
  ml3: {
    marginLeft: "_Spacing.default.H3",
  },
  ml4: {
    marginLeft: "_Spacing.default.H4",
  },
  ml5: {
    marginLeft: "_Spacing.default.H5",
  },
  mr0: {
    marginRight: 0,
  },
  mr1: {
    marginRight: "_Spacing.default.H1",
  },
  mr2: {
    marginRight: "_Spacing.default.H2",
  },
  mr3: {
    marginRight: "_Spacing.default.H3",
  },
  mr4: {
    marginRight: "_Spacing.default.H4",
  },
  mr5: {
    marginRight: "_Spacing.default.H5",
  },
  mt0: {
    marginTop: 0,
  },
  mt1: {
    marginTop: "_Spacing.default.V1",
  },
  mt2: {
    marginTop: "_Spacing.default.V2",
  },
  mt3: {
    marginTop: "_Spacing.default.V3",
  },
  mt4: {
    marginTop: "_Spacing.default.V4",
  },
  mt5: {
    marginTop: "_Spacing.default.V5",
  },
  mb0: {
    marginBottom: 0,
  },
  mb1: {
    marginBottom: "_Spacing.default.V1",
  },
  mb2: {
    marginBottom: "_Spacing.default.V2",
  },
  mb3: {
    marginBottom: "_Spacing.default.V3",
  },
  mb4: {
    marginBottom: "_Spacing.default.V4",
  },
  mb5: {
    marginBottom: "_Spacing.default.V5",
  },
  mainPadding: {
    paddingHorizontal: "_Spacing.default.H3",
  },
  p0: {
    padding: 0,
  },
  p1: {
    padding: "_Spacing.default.H1",
  },
  p2: {
    padding: "_Spacing.default.H2",
  },
  p3: {
    padding: "_Spacing.default.H3",
  },
  p4: {
    padding: "_Spacing.default.H4",
  },
  p5: {
    padding: "_Spacing.default.H5",
  },
  pl0: {
    paddingLeft: 0,
  },
  pl1: {
    paddingLeft: "_Spacing.default.H1",
  },
  pl2: {
    paddingLeft: "_Spacing.default.H2",
  },
  pl3: {
    paddingLeft: "_Spacing.default.H3",
  },
  pl4: {
    paddingLeft: "_Spacing.default.H4",
  },
  pl5: {
    paddingLeft: "_Spacing.default.H5",
  },
  pr0: {
    paddingRight: 0,
  },
  pr1: {
    paddingRight: "_Spacing.default.H1",
  },
  pr2: {
    paddingRight: "_Spacing.default.H2",
  },
  pr3: {
    paddingRight: "_Spacing.default.H3",
  },
  pr4: {
    paddingRight: "_Spacing.default.H4",
  },
  pr5: {
    paddingRight: "_Spacing.default.H5",
  },
  pt0: {
    paddingTop: 0,
  },
  pt1: {
    paddingTop: "_Spacing.default.V1",
  },
  pt2: {
    paddingTop: "_Spacing.default.V2",
  },
  pt3: {
    paddingTop: "_Spacing.default.V3",
  },
  pt4: {
    paddingTop: "_Spacing.default.V4",
  },
  pt5: {
    paddingTop: "_Spacing.default.V5",
  },
  pb0: {
    paddingBottom: 0,
  },
  pb1: {
    paddingBottom: "_Spacing.default.V1",
  },
  pb2: {
    paddingBottom: "_Spacing.default.V2",
  },
  pb3: {
    paddingBottom: "_Spacing.default.V3",
  },
  pb4: {
    paddingBottom: "_Spacing.default.V4",
  },
  pb5: {
    paddingBottom: "_Spacing.default.V5",
  },
  //colors
  colorPrimaryDarkGray: {
    color: "_Colors.default.primaryDarkGray",
  },
  colorPrimaryMediumBlue: {
    color: "_Colors.default.primaryMediumBlue",
  },
  colorPrimaryMediumGreen: {
    color: "_Colors.default.primaryMediumGreen",
  },
  colorSecondaryRed: {
    color: "_Colors.default.secondaryRed",
  },
  colorOecondaryOrange: {
    color: "_Colors.default.secondaryOrange",
  },
  colorSecondaryMediumGray: {
    color: "_Colors.default.secondaryMediumGray",
  },
  colorSecondaryLightGray: {
    color: "_Colors.default.secondaryLightGray",
  },
  colorBorderMedGray: {
    color: "_Colors.default.shadowMedGray",
  },
  colorCalendarBorderFirst: {
    color: "_Colors.default.calendarBorderFirst",
  },
  colorCalendarBorderSecond: {
    color: "_Colors.default.calendarBorderSecond",
  },
  colorSecondaryLightBlue: {
    color: "_Colors.default.secondaryLightBlue",
  },
  colorSecondaryLightGreen: {
    color: "_Colors.default.secondaryLightGreen",
  },
  colorWhite: {
    color: "_Colors.default.white",
  },
  colorBlack: {
    color: "#000000",
  },
};

module.exports = { StyleUtils: StyleUtils };
