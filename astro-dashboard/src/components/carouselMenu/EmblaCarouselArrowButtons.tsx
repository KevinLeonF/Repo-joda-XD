import type { ComponentPropsWithRef } from "react";
import React, { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { primaryColor, secondayColor } from "@/styles/global";
import type { CSSProperties } from "@mui/material";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;
const styleButtons: CSSProperties = {
  padding: "20px",
  borderRadius: "50%",
  margin: "0px 15px",
  cursor: "pointer",
};

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      style={{ background: secondayColor, ...styleButtons }}
    >
      <ArrowBackIos />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      style={{ background: primaryColor, ...styleButtons }}
    >
      <ArrowForwardIos />
      {children}
    </button>
  );
};
