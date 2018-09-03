import pickAndComputeForSorting from "./pickAndComputeForSorting";

const ComputeViewCount = async db => {
  pickAndComputeForSorting("daily");
  pickAndComputeForSorting("monthly");
};

export default ComputeViewCount;
