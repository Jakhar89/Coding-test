import React from 'react';

export type SvgProps = {
  ariaHidden?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: any;
  fill?: string;
  name?: string;
  role?: string;
  title?: string;
  titleId?: string;
  stroke?: string;
  viewW?: string;
  viewH?: string;
};

const Title = ({ id, title }) => {
  if (!id && !title) {
    return null;
  }

  if (!id) {
    return <title>{title}</title>;
  }

  return <title id={id}>{title}</title>;
};

const defaultProps: any = {
  role: 'presentation',
};

const Svg: React.FC<SvgProps> = (props) => {
  const merged = {
    ...defaultProps,
    ...props,
  };

  const {
    width,
    height,
    children,
    name,
    title,
    titleId,
    role,
    ariaLabelledBy,
    ariaHidden,
    ariaLabel,
    fill,
    fillOpacity,
    stroke,
    viewW,
    viewH,
  } = merged;

  const svgProps = {
    ...(role && { role }),
    ...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy }),
    ...(ariaHidden && { 'aria-hidden': ariaHidden }),
    ...(ariaLabel && { 'aria-label': ariaLabel }),
  };

  const titleProps = {
    ...(title && { title }),
    ...(titleId && { id: titleId }),
  };

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      width={width ? width : viewW}
      height={height ? height : viewH}
      fill={fill ? fill : 'black'}
      stroke={stroke ? stroke : 'none'}
      name={name}
      fillOpacity={fillOpacity}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <Title {...titleProps} />
      {children}
    </svg>
  );
};

export default Svg;

export const withSvg = (width, height) =>
  function <T extends SvgProps = SvgProps>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const withSvg: React.FC<T> = (props: T) => (
      <Svg
        viewW={width}
        viewH={height}
        {...props}
      >
        <WrappedComponent {...(props as T)} />
      </Svg>
    );

    withSvg.displayName = `withSvg(${displayName})`;

    return withSvg;
  };
