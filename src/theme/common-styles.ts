export const s = {
  flex: (factor?: number) => ({
    flex: factor ?? 1,
  }),
  flexGrow: (factor?: number) => ({
    flexGrow: factor ?? 1,
  }),
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  widthPercentage: (percentageNumber: number) => ({
    width: `${percentageNumber.toString()}%`,
  }),
  maxWidthPercentage: (percentageNumber: number) => ({
    maxWidth: `${percentageNumber.toString()}%`,
  }),
  heightPercentage: (percentageNumber: number) => ({
    height: `${percentageNumber.toString()}%`,
  }),
  maxHeightPercentage: (percentageNumber: number) => ({
    height: `${percentageNumber.toString()}%`,
  }),
} as const;
