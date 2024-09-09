import React, { useState } from 'react';

const CircularProgress = ({progress, stroke, radius}) => {

  // Cálculo do perímetro do círculo
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* SVG para o círculo de progresso */}
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#655A7C" // Cor do progresso (personalizável)
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-stroke-dashoffset duration-300 ease-in-out"
        />
      </svg>

      {/* Texto para exibir a porcentagem */}
      <div className="text-sm font-semibold">
        {progress}%
      </div>

      {/* Botão para atualizar o progresso */}
      {/* <button
        onClick={updateProgress}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Atualizar Progresso
      </button> */}
    </div>
  );
};

export default CircularProgress;
