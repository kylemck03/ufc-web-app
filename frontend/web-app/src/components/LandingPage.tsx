import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  // Smooth scroll progress for parallax effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transformations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.3]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const titleAnimation = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
      }
    }
  };

  const titleContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const letterVariants = {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.3
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -1, 1, 0],
      transition: {
        rotate: {
          duration: 0.2,
          repeat: 0
        }
      },
      boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
    }
  };

  const ctaVariants = {
    initial: { scale: 1, borderRadius: "30px" },
    animate: {
      scale: 1,
      borderRadius: ["30px", "12px", "30px"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        borderRadius: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    },
    hover: {
      scale: 1.05,
      borderRadius: "16px",
      transition: {
        duration: 0.3
      }
    },
    tap: { 
      scale: 0.95,
      borderRadius: "8px"
    }
  };

  // Split the title into individual letters
  const titleText = "UFC Fight Predictor";
  const titleLetters = titleText.split("");

  return (
    <div className="landing-container">
      <motion.section 
        className="hero-section"
        style={{ 
          scale: heroScale,
          opacity: heroOpacity,
          backgroundPositionY: backgroundY 
        }}
      >
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.div
            className="hero-title-container"
            variants={titleContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h1 className="animated-title">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ 
                    display: 'inline-block',
                    marginRight: letter === ' ' ? '0.3em' : '0.02em'
                  }}
                  animate="animate"
                  custom={index}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Predict Fight Outcomes with Machine Learning
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Our advanced AI model analyzes fighter statistics and historical data 
            to predict UFC fight outcomes with high accuracy.
          </motion.p>

          <motion.div
            variants={ctaVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cta-wrapper"
          >
            <Link to="/predict" className="cta-button">
              Try It Now
              <motion.span 
                className="cta-arrow"
                animate={{ 
                  x: [0, 5, 0],
                  opacity: [1, 0.6, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          {
            title: "Advanced Analytics",
            description: "Utilizing comprehensive fighter statistics and machine learning to deliver accurate predictions.",
            icon: "📊"
          },
          {
            title: "Real-Time Results",
            description: "Get instant fight outcome predictions with detailed probability breakdowns.",
            icon: "⚡"
          },
          {
            title: "User-Friendly",
            description: "Simple interface to input fighter stats and receive quick predictions.",
            icon: "👥"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={cardVariants}
            whileHover="hover"
            custom={index}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div 
              className="feature-icon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {feature.icon}
            </motion.div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section 
        className="how-it-works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          className="section-title"
          variants={titleVariants}
        >
          How It Works
        </motion.h2>
        
        <div className="steps-container">
          {[
            {
              number: "01",
              title: "Select Fighters",
              description: "Choose from our comprehensive database of UFC fighters, including both active and retired athletes. Our system maintains up-to-date statistics for all fighters."
            },
            {
              number: "02",
              title: "Advanced Analysis",
              description: "Our AI model processes over 100 different data points, including fighting style, win/loss records, physical attributes, and historical performance metrics."
            },
            {
              number: "03",
              title: "Get Predictions",
              description: "Receive detailed fight outcome predictions with probability percentages, along with key factors that influenced the prediction."
            },
            {
              number: "04",
              title: "Track Performance",
              description: "Monitor the accuracy of predictions over time and gain insights into fighting patterns and trends in the UFC."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              variants={cardVariants}
              custom={index}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;