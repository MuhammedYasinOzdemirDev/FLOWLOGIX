import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { ClockCountdownIcon } from '@phosphor-icons/react/dist/csr/ClockCountdown'
import { FlowArrowIcon } from '@phosphor-icons/react/dist/csr/FlowArrow'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { PathIcon } from '@phosphor-icons/react/dist/csr/Path'
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { SparkleIcon } from '@phosphor-icons/react/dist/csr/Sparkle'
import { UsersThreeIcon } from '@phosphor-icons/react/dist/csr/UsersThree'

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const drawConnector = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }

  to {
    opacity: 1;
    transform: scaleY(1);
  }
`

const flowSteps = [
  {
    icon: UsersThreeIcon,
    eyebrow: 'Ana veri',
    title: 'Müşteri kaydı',
    description: 'Ticari ilişkinin başlangıç noktası',
  },
  {
    icon: MapPinIcon,
    eyebrow: 'Operasyon ağı',
    title: 'Lokasyonlar',
    description: 'Yükleme ve teslimat noktaları',
  },
  {
    icon: FlowArrowIcon,
    eyebrow: 'Taşıma akışı',
    title: 'Operasyon',
    description: 'Planlanan ve gerçekleşen süreç',
  },
] as const

const roadmapItems = [
  {
    icon: UsersThreeIcon,
    status: 'Şimdi',
    title: 'Müşteri ve lokasyon',
    description: 'İlk dikey dilim, müşteri kartı ve operasyon noktalarıyla başlayacak.',
    color: '#2563EB',
    background: 'rgba(37, 99, 235, 0.09)',
  },
  {
    icon: PathIcon,
    status: 'Sonraki',
    title: 'Sipariş ve sevkiyat',
    description: 'Taşıma talebi, duraklar ve planlanan operasyon akışı kurulacak.',
    color: '#0F766E',
    background: 'rgba(15, 118, 110, 0.09)',
  },
  {
    icon: ShieldCheckIcon,
    status: 'MVP',
    title: 'Filo ve teslimat',
    description: 'Özmal araç, sürücü ataması ve teslimat kanıtı aynı akışa bağlanacak.',
    color: '#7C3AED',
    background: 'rgba(124, 58, 237, 0.08)',
  },
] as const

export function OperationsOverviewPage() {
  return (
    <Stack spacing={{ xs: 2.5, md: 3.5 }}>
      <Paper
        component="section"
        aria-labelledby="operations-overview-title"
        elevation={0}
        sx={{
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          p: {
            xs: 2.5,
            sm: 4,
            lg: 5,
          },
          border: '1px solid rgba(96, 165, 250, 0.2)',
          borderRadius: {
            xs: 3,
            md: 4,
          },
          color: 'common.white',
          background: 'linear-gradient(135deg, #07111F 0%, #0B1739 48%, #0B2D4A 76%, #0F4C5C 118%)',
          boxShadow: '0 28px 70px rgba(15, 23, 42, 0.18)',
          animation: `${reveal} 560ms cubic-bezier(0.22, 1, 0.36, 1) both`,

          '&::before': {
            position: 'absolute',
            zIndex: -1,
            top: -180,
            right: -120,
            width: 500,
            height: 500,
            content: '""',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(96, 165, 250, 0.28), rgba(45, 212, 191, 0.08) 46%, transparent 70%)',
          },

          '&::after': {
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            content: '""',
            opacity: 0.13,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(105deg, transparent 12%, black 74%, transparent)',
          },

          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.18fr) minmax(320px, 0.82fr)',
            },
            gap: {
              xs: 4,
              lg: 6,
            },
            alignItems: 'center',
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <Box
                aria-hidden="true"
                sx={{
                  display: 'grid',
                  width: 30,
                  height: 30,
                  placeItems: 'center',
                  border: '1px solid rgba(147, 197, 253, 0.28)',
                  borderRadius: 2,
                  bgcolor: 'rgba(96, 165, 250, 0.13)',
                  color: 'primary.light',
                }}
              >
                <SparkleIcon size={17} weight="fill" />
              </Box>
              <Typography variant="overline" sx={{ color: 'rgba(219, 234, 254, 0.82)' }}>
                Operasyon Kontrol Kulesi
              </Typography>
            </Stack>

            <Typography
              id="operations-overview-title"
              component="h1"
              sx={{
                maxWidth: 760,
                m: 0,
                fontSize: {
                  xs: '2.15rem',
                  sm: '3rem',
                  lg: '3.55rem',
                },
                fontWeight: 780,
                letterSpacing: '-0.055em',
                lineHeight: 1.02,
                textWrap: 'balance',
              }}
            >
              Operasyonun dağınık sinyallerini tek karar ekranında topla.
            </Typography>

            <Typography
              sx={{
                maxWidth: 670,
                mt: 2.25,
                color: 'rgba(226, 232, 240, 0.78)',
                fontSize: {
                  xs: '0.95rem',
                  sm: '1.05rem',
                },
                lineHeight: 1.72,
              }}
            >
              Müşteri talebinden teslimat kanıtına kadar taşıma akışını görünür, açıklanabilir ve
              yönetilebilir hâle getiren operasyon platformu.
            </Typography>

            <Stack
              direction="row"
              useFlexGap
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                mt: 3,
              }}
            >
              {['Yurtiçi taşıma', 'Komple yük', 'Özmal filo'].map((label) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  sx={{
                    border: '1px solid rgba(191, 219, 254, 0.18)',
                    bgcolor: 'rgba(255, 255, 255, 0.07)',
                    color: 'rgba(239, 246, 255, 0.88)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box
            aria-label="Müşteriden operasyona veri akışı"
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
              },
              border: '1px solid rgba(191, 219, 254, 0.18)',
              borderRadius: 3,
              bgcolor: 'rgba(7, 17, 31, 0.52)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(18px)',
              animation: `${reveal} 620ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both`,

              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
              },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <Box
                aria-hidden="true"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'secondary.light',
                  boxShadow: '0 0 0 5px rgba(45, 212, 191, 0.1)',
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(226, 232, 240, 0.66)' }}>
                İlk operasyon veri zinciri
              </Typography>
            </Stack>

            <Stack>
              {flowSteps.map((step, index) => {
                const StepIcon = step.icon

                return (
                  <Box key={step.title}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: 'center',
                        p: 1.5,
                        border: '1px solid rgba(148, 163, 184, 0.13)',
                        borderRadius: 2.25,
                        bgcolor: 'rgba(255, 255, 255, 0.045)',
                      }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          display: 'grid',
                          width: 40,
                          height: 40,
                          flex: '0 0 auto',
                          placeItems: 'center',
                          borderRadius: 2,
                          color:
                            index === flowSteps.length - 1 ? 'secondary.light' : 'primary.light',
                          bgcolor:
                            index === flowSteps.length - 1
                              ? 'rgba(45, 212, 191, 0.1)'
                              : 'rgba(96, 165, 250, 0.1)',
                        }}
                      >
                        <StepIcon size={21} weight="duotone" />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="overline"
                          sx={{
                            display: 'block',
                            color: 'rgba(148, 163, 184, 0.74)',
                            lineHeight: 1.35,
                          }}
                        >
                          {step.eyebrow}
                        </Typography>
                        <Typography sx={{ mt: 0.15, color: 'common.white', fontWeight: 700 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(203, 213, 225, 0.68)' }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Stack>

                    {index < flowSteps.length - 1 ? (
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 1,
                          height: 18,
                          mx: 'auto',
                          background:
                            'linear-gradient(to bottom, rgba(96, 165, 250, 0.56), rgba(45, 212, 191, 0.3))',
                          transformOrigin: 'top',
                          animation: `${drawConnector} 420ms ${260 + index * 120}ms ease-out both`,

                          '@media (prefers-reduced-motion: reduce)': {
                            animation: 'none',
                          },
                        }}
                      />
                    ) : null}
                  </Box>
                )
              })}
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Box
        component="section"
        aria-labelledby="delivery-path-title"
        sx={{
          animation: `${reveal} 560ms 100ms cubic-bezier(0.22, 1, 0.36, 1) both`,

          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: {
              xs: 'flex-start',
              sm: 'flex-end',
            },
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              Ürün yolu
            </Typography>
            <Typography id="delivery-path-title" component="h2" variant="h2" sx={{ mt: 0.35 }}>
              İlk çalışan akışa doğru
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'center', color: 'text.secondary' }}
          >
            <ClockCountdownIcon aria-hidden="true" size={18} weight="duotone" />
            <Typography variant="body2">2–3 aylık MVP odağı</Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {roadmapItems.map((item, index) => {
            const ItemIcon = item.icon

            return (
              <Paper
                key={item.title}
                variant="outlined"
                sx={{
                  position: 'relative',
                  minHeight: 210,
                  overflow: 'hidden',
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.86)',
                  boxShadow: '0 14px 34px rgba(15, 23, 42, 0.055)',
                  transition:
                    'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                  animation: `${reveal} 520ms ${180 + index * 90}ms cubic-bezier(0.22, 1, 0.36, 1) both`,

                  '&::after': {
                    position: 'absolute',
                    right: -36,
                    bottom: -52,
                    width: 150,
                    height: 150,
                    content: '""',
                    borderRadius: '50%',
                    background: item.background,
                    filter: 'blur(2px)',
                  },

                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: item.color,
                    boxShadow: '0 22px 48px rgba(15, 23, 42, 0.1)',
                  },

                  '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none',
                    transition: 'none',

                    '&:hover': {
                      transform: 'none',
                    },
                  },
                }}
              >
                <Stack sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: 'grid',
                        width: 44,
                        height: 44,
                        placeItems: 'center',
                        borderRadius: 2.5,
                        color: item.color,
                        bgcolor: item.background,
                      }}
                    >
                      <ItemIcon size={23} weight="duotone" />
                    </Box>

                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        height: 24,
                        bgcolor: item.background,
                        color: item.color,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Stack>

                  <Typography component="h3" variant="h3" sx={{ mt: 2.25 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.85, color: 'text.secondary' }}>
                    {item.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center',
                      mt: 'auto',
                      pt: 2,
                      color: item.color,
                    }}
                  >
                    <CheckCircleIcon aria-hidden="true" size={17} weight="duotone" />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Kapsam kararı net
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            )
          })}
        </Box>
      </Box>
    </Stack>
  )
}
