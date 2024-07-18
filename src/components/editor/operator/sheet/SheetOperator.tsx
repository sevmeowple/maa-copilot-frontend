import { FC, useCallback, useRef } from 'react'

import { SheetContainerSkeleton } from './SheetContainerSkeleton'
import { OperatorNoData } from './SheetNoneData'
import { ProfClassificationWithFilters } from './sheetOperator/ProfClassificationWithFilters'
import {
  OperatorFilterProvider,
  useOperatorFilterProvider,
} from './sheetOperator/SheetOperatorFilterProvider'
import { SheetOperatorItem } from './sheetOperator/SheetOperatorItem'
import { ShowMore } from './sheetOperator/ShowMore'

export interface SheetOperatorProps {}

// const defaultRarityFilter = Array.from(
//   new Array(Math.max(...OPERATORS.map(({ rarity }) => rarity)) + 1).keys(),
// ).slice(Math.min(...OPERATORS.map(({ rarity }) => rarity)))

const SheetOperator: FC<SheetOperatorProps> = () => {
  const operatorScrollRef = useRef<HTMLDivElement>(null)

  const toTop = useCallback(
    () => operatorScrollRef?.current?.scrollIntoView(),
    [operatorScrollRef],
  )

  const {
    operatorFiltered: { data: operatorFilteredData },
  } = useOperatorFilterProvider()

  return (
    <div className="flex h-full">
      <div className="flex-auto px-1" ref={operatorScrollRef}>
        {operatorFilteredData.length ? (
          <>
            <div
              key="operatorContainer"
              className="flex flex-wrap items-start content-start overscroll-contain relative"
            >
              {operatorFilteredData.map(({ name }, index) => (
                <div className="flex items-center flex-0 w-32 h-32" key={index}>
                  <SheetOperatorItem {...{ name }} />
                </div>
              ))}
            </div>
            <ShowMore {...{ toTop }} />
          </>
        ) : (
          OperatorNoData
        )}
      </div>
      <div className="h-screen sticky top-0 sticky flex flex-col">
        <ProfClassificationWithFilters {...{ toTop }} />
      </div>
    </div>
  )
}

export const SheetOperatorContainer = (
  sheetOperatorProp: SheetOperatorProps,
) => (
  <SheetContainerSkeleton title="选择干员" icon="person">
    <OperatorFilterProvider>
      <SheetOperator {...sheetOperatorProp} />
    </OperatorFilterProvider>
  </SheetContainerSkeleton>
)
