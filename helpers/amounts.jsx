/////////////////////////////// ReturnProdScreen
export const totalSumReturns = (list) => {
  const totalSum = list?.products?.reduce(
    (total, item) => total + +item?.price * +item?.count,
    0
  );

  return formatCount(totalSum);
};

export const totalCountReturns = (list) => {
  const totalCount = list?.products?.reduce(
    (total, item) => +total + +item?.count,
    0
  );

  return formatCount(totalCount);
};

/////////////////////////////// EveryListInvoiceReturn
export const totalLidtCountReturns = (list) => {
  const totalSum = list?.reduce((total, item) => {
    return +item.price * +item.count + total;
  }, 0);

  return formatCount(totalSum);
};

/////////////////////////////// DetailedInvoice

export const totalCountAccept = (data) => {
  const totalItemCount = data?.list?.reduce(
    (total, item) => +total + +item?.count,
    0
  );

  return formatCount(totalItemCount);
};

export const totalSumAccept = (data) => {
  const totalSum = data?.list?.reduce(
    (total, item) => +item?.count * +item?.price + +total,
    0
  );

  return formatCount(totalSum);
};

/////////////////////////////// EveryInvoiceAcceptScreen

export const totalSumEveryAccept = (list) => {
  const totalSum = list?.reduce((total, item) => {
    return +item?.price * +item?.count + total;
  }, 0);

  return formatCount(totalSum);
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
export const formatCount = (count) => {
  /// если больше 0, то округлять до 1го числа, а если его нет, то выводится просто целое число без 0
  return count % 1 === 0 ? count?.toFixed(0) : count?.toFixed(1);
};
