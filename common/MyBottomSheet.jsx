import { StyleSheet } from 'react-native';
import { useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export const MyBottomSheet = (props) => {
  //// для создания аккардиона

  const { refAccord, children, listHeight } = props;

  const snapPoints = useMemo(() => {
    return listHeight || ['60%'];
  }, [listHeight]);

  const shadowBlock = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      ></BottomSheetBackdrop>
    ),
    []
  );

  const closeAccordion = () => refAccord.current?.close();

  return (
    <BottomSheet
      ref={refAccord}
      index={-1}
      snapPoints={listHeight}
      enablePanDownToClose={true}
      backdropComponent={shadowBlock}
      onClose={closeAccordion}
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minWidth: '100%',
  },
});
